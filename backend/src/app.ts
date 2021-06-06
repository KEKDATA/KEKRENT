import { chromium, devices } from 'playwright';
import cheerio from 'cheerio';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';

import { getHTML } from './lib/dom/get_html';
import { selectors } from './constants/selectors';
import { asyncGenerator } from './lib/generators/async_generator';
import { sleep } from './lib/timeout/sleep';

const iPhone = devices['iPhone 11 Pro'];
const elements = 20;
const elementsPerPage = 20;
const groupId = 126101298046115;

const init = async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(iPhone);
  const page = await context.newPage();

  await page.goto(`https://m.facebook.com/groups/${groupId}`);

  for await (let num of asyncGenerator(elements / elementsPerPage)) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    await sleep(100);

    const loadMore = await page.$(selectors.moreItem);
    await loadMore?.click();

    await sleep(100);

    const noisyPopup = await page.$(selectors.noisyLoginPopup);
    await noisyPopup?.click();

    await sleep(100);

    await page.waitForSelector(selectors.withoutLoader, { timeout: 10000 });
  }

  const postsHandledElements = await page.$$(selectors.post);
  const isEnoughPosts = postsHandledElements.length >= elements;
  const posts: Array<{
    title: string;
    price: string;
    address: string;
    description: string;
    publishDate: string | null;
    timestamp: number | null;
    link?: string;
    photos: string[];
  }> = [];

  if (isEnoughPosts) {
    const contentPage = await page.evaluate(getHTML);
    const $ = cheerio.load(contentPage);

    $(selectors.post).each(async (index, post) => {
      const postNode = $(post);
      const title = postNode.find(selectors.title).text();
      const price = postNode.find(selectors.price).text();
      const address = postNode.find(selectors.address).text();
      const description = postNode.find(selectors.description).text();
      const link = postNode.find(selectors.someTimesAgo).attr('href');
      const photosContainer = postNode.find(selectors.photosContainer);

      const dataFt = postNode.attr('data-ft');
      let publishDate: string | null = null;
      let timestamp: number | null = null;
      if (dataFt) {
        const parsedDataFt = JSON.parse(dataFt);
        const publishTime =
          parsedDataFt?.page_insights[groupId]?.post_context?.publish_time;
        const date = new Date(publishTime * 1000);

        timestamp = date.getTime();
        publishDate = date.toLocaleDateString('en-US');
      }

      const photos: string[] = [];

      $(photosContainer.find('._26ih')).each((_, photoContainer) => {
        const src = $(photoContainer).find(selectors.photo).attr('src');

        if (src) {
          photos.push(src);
        }
      });

      posts.push({
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

const initializedFastify = fastify();

initializedFastify.register(fastifyCors);

initializedFastify.get('/posts', async (request, reply) => {
  const posts = await init();

  return { posts };
});

const start = async () => {
  try {
    await initializedFastify.listen(3000);
  } catch (err) {
    initializedFastify.log.error(err);
    process.exit(1);
  }
};
start();
