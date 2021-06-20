import { chromium } from 'playwright';
import { searchPosts } from './lib/search_posts';
import { normalizeSearchedPosts } from './lib/normalize_searched_posts';
import { getFilteredPostsBySettings } from './lib/get_filtered_posts_by_settings';
import { UniqPosts } from '../../types/posts';
import { getPredictedPosts } from './lib/predict';
import { links } from '../../constants/links';
import { desktopSelectors } from '../../constants/selectors/desktop';
import { sleep } from '../../lib/timeout/sleep';

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

  const url = isDesktop ? links.facebookDesktop : links.facebookMobile;

  await page.goto(`${url}/groups/${selectedGroupId}`);

  const totalPosts: UniqPosts = {};
  let numberOfLatestParsedPost = 0;
  let noisyPopupClosed = false;

  while (Object.keys(totalPosts).length < postsByGroup) {
    noisyPopupClosed = await searchPosts({
      page,
      noisyPopupClosed,
      isDesktop,
    });

    await sleep(100);

    await page.evaluate(
      ([selector]) =>
        document
          .querySelectorAll(selector)
          .forEach((node: HTMLButtonElement) => node?.click()),
      [desktopSelectors.showAllDescription],
    );

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

    // const predictedPosts = await getPredictedPosts(filteredPosts);

    numberOfLatestParsedPost = Object.keys(posts).length;

    Object.entries(filteredPosts).forEach(([stupidId, post]) => {
      totalPosts[stupidId] = post;
    });

    await sleep(300);
  }

  await browser.close();

  return Object.values(totalPosts);
};
