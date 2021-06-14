import { Posts } from '../../../../types/posts';
import { getHTML } from '../../../../lib/dom/get_html';
import cheerio from 'cheerio';
import { selectors } from '../../../../constants/selectors';
import { nanoid } from 'nanoid';
import { Page } from 'playwright';

export const normalizeSearchedPosts = async ({
  page,
  postsByGroup,
  selectedGroupId,
}: {
  page: Page;
  postsByGroup: number;
  selectedGroupId: number | string;
}) => {
  const posts: Posts = [];

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
        parsedDataFt?.page_insights[selectedGroupId]?.post_context
          ?.publish_time;
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

  return posts;
};
