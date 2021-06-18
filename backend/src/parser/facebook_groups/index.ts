import { chromium } from 'playwright';
import { searchPosts } from './lib/search_posts';
import { normalizeSearchedPosts } from './lib/normalize_searched_posts';
import { getFilteredPostsBySettings } from './lib/get_filtered_posts_by_settings';
import { Posts } from '../../types/posts';
import { getPredictedPosts } from './lib/predict';

const isDesktop = true;

export const parseFacebookGroups = async ({
  selectedGroupId,
  postsByGroup,
  maxPrice,
  minPrice,
  timeStamps,
}: {
  selectedGroupId: number | string;
  postsByGroup: number;
  timeStamps: number[] | null;
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

  const url = isDesktop ? 'https://facebook.com' : 'https://m.facebook.com';

  await page.goto(`${url}/groups/${selectedGroupId}`);

  let totalPosts: Posts = [];
  let numberOfLatestParsedPost = 0;
  let noisyPopupClosed = false;

  while (totalPosts.length < postsByGroup) {
    noisyPopupClosed = await searchPosts({ page, noisyPopupClosed, isDesktop });

    const posts = await normalizeSearchedPosts({
      page,
      selectedGroupId,
      numberOfLatestParsedPost,
      postsByGroup,
      isDesktop,
    });

    const filteredPosts = getFilteredPostsBySettings({
      posts,
      maxPrice,
      minPrice,
      timeStamps,
    });

    const predictedPosts = await getPredictedPosts(filteredPosts);

    numberOfLatestParsedPost = posts.length;

    totalPosts = [...totalPosts, ...predictedPosts];
  }

  await browser.close();

  return totalPosts;
};
