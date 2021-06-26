import { chromium, devices } from 'playwright';
import { searchPosts } from './lib/search_posts';
import { normalizeSearchedPosts } from './lib/normalize_searched_posts';
import { getFilteredPostsBySettings } from './lib/get_filtered_posts_by_settings';
import { UniqPosts } from '../../types/posts';
import { getPredictedPosts } from './lib/predict';
import { facebookLinks } from '../../constants/links/facebook';
import { desktopSelectors } from '../../constants/selectors/desktop';
import cheerio from 'cheerio';
import Cheerio = cheerio.Cheerio;
import Root = cheerio.Root;
import { generatePostNode } from './lib/generate_post_node';
import { privatePass, privatePhone } from '../../../private/data';
import { updateUsersCookies } from './lib/update_users_cookies';
import { CacheKeys } from '../../constants/cache_keys';
import { CachedCookies, Cookies } from '../../types/cookies';
import { authUser } from './lib/auth_user';
import { get } from 'node-cache-redis';

const isDesktop = true;
const isAuth = true;

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
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext(
    isDesktop ? undefined : devices['iPhone X'],
  );

  const cookiesForUpload: Array<Cookies> = [
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
  ];

  let isSavedCookies = false;
  let isAuthCompleted = false;

  if (isAuth) {
    const authCookies: CachedCookies = (await get(CacheKeys.Cookies)) || {};

    const cookiesKey = `${privatePhone}${privatePass}`;
    const savedUserCookies = authCookies[cookiesKey];

    if (savedUserCookies) {
      isSavedCookies = true;
      cookiesForUpload.push(...savedUserCookies);
    }
  }

  await context.addCookies(cookiesForUpload);

  const page = await context.newPage();

  const url = isDesktop ? facebookLinks.desktop : facebookLinks.mobile;

  await page.goto(`${url}/groups/${selectedGroupId}`);

  if (isAuth && !isSavedCookies) {
    isAuthCompleted = await authUser(page, isDesktop);
  }

  try {
    const headerCriticalError = await page.$('.uiHeaderTitle');

    if (headerCriticalError) {
      await browser.close();

      return { posts: [], isError: true };
    }
    // eslint-disable-next-line no-empty
  } catch {}

  const totalPosts: UniqPosts = {};
  let numberOfLatestParsedPost = 0;
  let noisyPopupClosed = false;

  let fromIndexPost = 0;
  let toIndexPost = postsByGroup;

  while (Object.keys(totalPosts).length < postsByGroup) {
    if (isAuth && !isSavedCookies && !isAuthCompleted) {
      await authUser(page, isDesktop);
    }

    let counter = 1;
    let searchedPostsLength = 0;
    let postNode: null | Cheerio = null;
    let root: null | Root = null;

    const calculatedPartByTotalPosts = Object.keys(totalPosts).length / 10 || 1;

    while (searchedPostsLength < postsByGroup) {
      if (counter >= 10) {
        break;
      }

      noisyPopupClosed = await searchPosts({
        page,
        noisyPopupClosed,
        isDesktop,
        postsByGroup:
          postsByGroup / counter / Math.ceil(calculatedPartByTotalPosts),
      });

      const generatedNode = await generatePostNode(page, isDesktop);

      root = generatedNode.root;
      postNode = generatedNode.postNode;

      searchedPostsLength = postNode.length;

      counter++;

      if (isDesktop) {
        await page.evaluate(
          ([selector]) =>
            document
              .querySelectorAll(selector)
              .forEach((node: HTMLButtonElement) => node?.click()),
          [desktopSelectors.showAllDescription],
        );
      }
    }

    if (!root || !postNode) {
      const generatedNode = await generatePostNode(page, isDesktop);

      root = generatedNode.root;
      postNode = generatedNode.postNode;
    }

    const posts = await normalizeSearchedPosts({
      selectedGroupId,
      isDesktop,
      isAuth,
      fromIndexPost,
      toIndexPost,
      root,
      postNode,
    });

    const filteredPosts = getFilteredPostsBySettings({
      posts,
      maxPrice,
      minPrice,
      timeStamps,
    });

    // const predictedPosts = await getPredictedPosts(filteredPosts);

    numberOfLatestParsedPost = Object.keys(posts).length;

    Object.entries(filteredPosts).forEach(([stupidId, post]) => {
      totalPosts[stupidId] = post;
    });

    fromIndexPost = toIndexPost;
    toIndexPost = postNode.length;
  }

  if (isAuth) {
    await updateUsersCookies(context);
  }

  await browser.close();

  return { posts: Object.values(totalPosts), isError: false };
};
