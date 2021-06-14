import { chromium, devices } from 'playwright';
import { selectors } from '../../constants/selectors';
import { searchPosts } from './lib/search_posts';
import { normalizeSearchedPosts } from './lib/normalize_searched_posts';
import { getFilteredPostsBySettings } from './lib/get_filtered_posts_by_settings';

const iPhone = devices['iPhone 11 Pro'];

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

  const context = await browser.newContext(iPhone);

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

  await searchPosts({ page, postsByGroup });

  const postsHandledElements = await page.$$(selectors.post);
  const isEnoughNonFiltersPosts = postsHandledElements.length >= postsByGroup;

  if (!isEnoughNonFiltersPosts) {
    await searchPosts({
      page,
      postsByGroup: postsByGroup - postsHandledElements.length,
    });
  }

  const posts = await normalizeSearchedPosts({
    page,
    postsByGroup,
    selectedGroupId,
  });

  let filteredPosts = getFilteredPostsBySettings({
    posts,
    maxPrice,
    minPrice,
    timeStamps,
  });

  const isEnoughFiltersPosts = filteredPosts.length >= postsByGroup;
  const remainingPosts = postsByGroup - filteredPosts.length;

  if (!isEnoughFiltersPosts && remainingPosts > 5) {
    await searchPosts({
      page,
      postsByGroup: remainingPosts,
    });

    const updatedPosts = await normalizeSearchedPosts({
      page,
      postsByGroup,
      selectedGroupId,
    });

    filteredPosts = getFilteredPostsBySettings({
      posts: updatedPosts,
      maxPrice,
      minPrice,
      timeStamps,
    });
  }

  await browser.close();

  return filteredPosts;
};
