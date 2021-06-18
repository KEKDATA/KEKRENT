import { Posts } from '../../../../types/posts';
import { getHTML } from '../../../../lib/dom/get_html';
import cheerio from 'cheerio';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { nanoid } from 'nanoid';
import { Page } from 'playwright';
import { desktopSelectors } from '../../../../constants/selectors/desktop';

export const normalizeSearchedPosts = async ({
  page,
  selectedGroupId,
  numberOfLatestParsedPost,
  postsByGroup,
  isDesktop,
}: {
  page: Page;
  selectedGroupId: number | string;
  numberOfLatestParsedPost: number;
  postsByGroup: number;
  isDesktop: boolean;
}) => {
  const posts: Posts = [];

  const contentPage = await page.evaluate(getHTML);
  const $ = cheerio.load(contentPage);

  const postSelector = isDesktop ? desktopSelectors.post : mobileSelectors.post;

  $(postSelector)
    .slice(numberOfLatestParsedPost, postsByGroup)
    .each(async (index, post) => {
      const postNode = $(post);

      const titleNode = isDesktop
        ? desktopSelectors.title
        : mobileSelectors.title;
      const title = postNode.find(titleNode).text();

      const priceNode = isDesktop
        ? desktopSelectors.price
        : mobileSelectors.price;
      const price = postNode.find(priceNode).text();

      const addressNode = isDesktop
        ? desktopSelectors.address
        : mobileSelectors.address;
      const address = postNode.find(addressNode).text();

      const descriptionNode = isDesktop
        ? desktopSelectors.description
        : mobileSelectors.description;
      const description = postNode.find(descriptionNode).text();

      const linkedDescription = isDesktop
        ? ''
        : postNode.find(mobileSelectors.linkedDescription).text();

      const someTimesAgoNode = isDesktop
        ? desktopSelectors.someTimesAgo
        : mobileSelectors.someTimesAgo;
      const someTimesAgo = postNode.find(someTimesAgoNode);
      let link = isDesktop ? null : someTimesAgo.attr('href');

      const photosNode = isDesktop
        ? desktopSelectors.photos
        : mobileSelectors.photosContainer;
      const photosContainer = postNode.find(photosNode);

      const photosContainerSecondVariantNode = isDesktop
        ? desktopSelectors.photosSecondVariant
        : mobileSelectors.photosContainerSecondVariant;
      const photosContainerSecondVariant = postNode.find(
        photosContainerSecondVariantNode,
      );

      let timestamp = new Date().getTime();
      let publishDate = someTimesAgo.text();

      if (!isDesktop) {
        const dataFt = postNode.attr('data-ft');
        const parsedDataFt = JSON.parse(dataFt as string);
        const publishTime =
          parsedDataFt?.page_insights[selectedGroupId]?.post_context
            ?.publish_time;
        const date = publishTime ? new Date(publishTime * 1000) : null;
        timestamp = date?.getTime() ?? timestamp;
        publishDate = date?.toLocaleDateString('en-US') ?? publishDate;
      }

      const photos: string[] = [];

      $(photosContainer)
        .children()
        .each((_, photoContainer) => {
          if (!link) {
            link = $(photoContainer).find('a').attr('href');
          }

          const src = $(photoContainer).find('img').attr('src');

          if (src) {
            photos.push(src);
          }
        });

      if (photosContainerSecondVariant && photos.length === 0) {
        if (isDesktop) {
          link = photosContainerSecondVariant.attr('href');
          const src = photosContainerSecondVariant.find('img').attr('src');

          if (src) {
            photos.push(src);
          }
        } else {
          $(photosContainerSecondVariant)
            .children()
            .each((_, photoContainer) => {
              const src = $(photoContainer)
                .find(mobileSelectors.photo)
                .attr('src');

              if (src) {
                photos.push(src);
              }
            });
        }
      }

      posts.push({
        id: nanoid(10),
        title,
        price,
        address,
        description: `${description} ${linkedDescription}`,
        publishDate,
        timestamp,
        link: link as string,
        photos,
      });
    });

  return posts;
};
