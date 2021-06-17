import { chromium } from 'playwright';
import { searchPosts } from './lib/search_posts';
import { normalizeSearchedPosts } from './lib/normalize_searched_posts';
import { getFilteredPostsBySettings } from './lib/get_filtered_posts_by_settings';
import { Posts } from '../../types/posts';
import { nodeCache } from '../../config';
import { FastifyReply } from 'fastify';
import fetch from 'undici-fetch';

export const parseFacebookGroups = async ({
  selectedGroupId,
  postsByGroup,
  maxPrice,
  minPrice,
  timeStamps,
  cacheKey,
  reply,
}: {
  selectedGroupId: number | string;
  postsByGroup: number;
  timeStamps: number[] | null;
  cacheKey: string;
  reply: FastifyReply;
  minPrice?: string;
  maxPrice?: string;
}) => {
  const browser = await chromium.launch({ headless: true });

  const context = await browser.newContext();

  await context.addCookies([
    {
      name: 'locale',
      value: 'en_GB',
      domain: '.facebook.com',
      path: '/',
      expires: -1,
      httpOnly: false,
      secure: true,
      sameSite: 'None',
    },
  ]);

  const page = await context.newPage();

  await page.goto(`https://m.facebook.com/groups/${selectedGroupId}`);

  let totalPosts: Posts = [];
  let numberOfLatestParsedPost = 0;
  let noisyPopupClosed = false;
  let isSendingReply = false;

  while (totalPosts.length < postsByGroup) {
    noisyPopupClosed = await searchPosts({ page, noisyPopupClosed });

    const posts = await normalizeSearchedPosts({
      page,
      selectedGroupId,
      numberOfLatestParsedPost,
      postsByGroup,
    });

    const filteredPosts = getFilteredPostsBySettings({
      posts,
      maxPrice,
      minPrice,
      timeStamps,
    });

    const result = await Promise.all(
      filteredPosts.map(async filteredPost => {
        const res = await fetch(
          `http://127.0.0.1:8000/predict_advertisement?text=${filteredPost.description}`,
          {
            method: 'POST',
          },
        );
        const { classIndex, prob }: { classIndex: number; prob: number } =
          await res.json();

        return {
          ...filteredPost,
          classIndex,
          prob,
        };
      }),
    );

    numberOfLatestParsedPost = result.length;

    const cachedPosts: Posts = nodeCache.get(cacheKey) || [];

    totalPosts = [...cachedPosts, ...result];

    nodeCache.set(cacheKey, totalPosts);

    if (!isSendingReply) {
      const response = { status: 'success', postsByGroup, cacheKey };
      reply.send(response);

      isSendingReply = true;
    }
  }

  await browser.close();
};
