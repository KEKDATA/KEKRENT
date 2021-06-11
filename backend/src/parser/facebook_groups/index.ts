import { chromium, devices } from 'playwright';
import { asyncGenerator } from '../../lib/generators/async_generator';
import { sleep } from '../../lib/timeout/sleep';
import { selectors } from '../../constants/selectors';
import { getHTML } from '../../lib/dom/get_html';
import cheerio from 'cheerio';
import { nanoid } from 'nanoid';
import { Posts } from '../../types/posts';

const iPhone = devices['iPhone 11 Pro'];
const elementsPerPage = 20;

export const parseFacebookGroups = async (
  groupId: number | string,
  postsByGroup: number,
) => {
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

  await page.goto(`https://m.facebook.com/groups/${groupId}`);

  let noisyPopupClosed = false;
  for await (let num of asyncGenerator(postsByGroup / elementsPerPage)) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await sleep(100);

    const loadMore = await page.$(selectors.moreItem);
    if (loadMore) {
      await loadMore.click();
    }

    if (!noisyPopupClosed) {
      await sleep(100);

      const noisyPopup = await page.$(selectors.noisyLoginPopup);
      if (noisyPopup) {
        await noisyPopup.click();
        noisyPopupClosed = true;
      }
    }

    await sleep(100);

    await page.waitForSelector(selectors.withoutLoader, { timeout: 10000 });
  }

  const postsHandledElements = await page.$$(selectors.post);
  const isEnoughPosts = postsHandledElements.length >= postsByGroup;
  const posts: Posts = [];

  if (isEnoughPosts) {
    const contentPage = await page.evaluate(getHTML);
    const $ = cheerio.load(contentPage);

    $(selectors.post)
      .slice(0, postsByGroup)
      .each(async (index, post) => {
        const postNode = $(post);
        const title = postNode.find(selectors.title).text();
        const price = postNode.find(selectors.price).text();
        const address = postNode.find(selectors.address).text();
        const description = postNode.find(selectors.description).text();
        const someTimesAgo = postNode.find(selectors.someTimesAgo);
        const link = someTimesAgo.attr('href');
        const photosContainer = postNode.find(selectors.photosContainer);

        const dataFt = postNode.attr('data-ft');
        const parsedDataFt = JSON.parse(dataFt as string);
        const publishTime =
          parsedDataFt?.page_insights[groupId]?.post_context?.publish_time;
        const date = publishTime ? new Date(publishTime * 1000) : null;
        const timestamp = date?.getTime() ?? new Date().getTime();
        const publishDate =
          date?.toLocaleDateString('en-US') ?? someTimesAgo.text();

        const photos: string[] = [];

        $(photosContainer)
          .children()
          .each((_, photoContainer) => {
            const src = $(photoContainer).find(selectors.photo).attr('src');

            if (src) {
              photos.push(src);
            }
          });

        posts.push({
          id: nanoid(10),
          title,
          price,
          address,
          description,
          publishDate,
          timestamp,
          link,
          photos,
        });
      });
  }

  await browser.close();
  return posts;
};
