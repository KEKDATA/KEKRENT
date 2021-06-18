import { Posts } from '../../../../types/posts';
import { getHTML } from '../../../../lib/dom/get_html';
import cheerio from 'cheerio';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { nanoid } from 'nanoid';
import { Page } from 'playwright';
import { desktopSelectors } from '../../../../constants/selectors/desktop';
import { links } from '../../../../constants/links';

const getSelectedSelector = ({
  desktopSelector,
  mobileSelector,
  isDesktop,
}: {
  desktopSelector: string;
  mobileSelector: string;
  isDesktop: boolean;
}) => {
  const selectedSelector = isDesktop ? desktopSelector : mobileSelector;

  return selectedSelector;
};

const getText = ({
  desktopSelector,
  mobileSelector,
  node,
  isDesktop,
}: {
  desktopSelector: string;
  mobileSelector: string;
  node: cheerio.Cheerio;
  isDesktop: boolean;
}) => {
  const text = node
    .find(getSelectedSelector({ desktopSelector, mobileSelector, isDesktop }))
    .text();

  return text;
};

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

      const title = getText({
        mobileSelector: mobileSelectors.title,
        desktopSelector: desktopSelectors.title,
        node: postNode,
        isDesktop,
      });

      const price = getText({
        mobileSelector: mobileSelectors.price,
        desktopSelector: desktopSelectors.price,
        node: postNode,
        isDesktop,
      });

      const address = getText({
        mobileSelector: mobileSelectors.address,
        desktopSelector: desktopSelectors.address,
        node: postNode,
        isDesktop,
      });

      const description = getText({
        mobileSelector: mobileSelectors.description,
        desktopSelector: desktopSelectors.description,
        node: postNode,
        isDesktop,
      });

      const linkedDescription = isDesktop
        ? ''
        : postNode.find(mobileSelectors.linkedDescription).text();

      const someTimesAgo = postNode.find(
        getSelectedSelector({
          desktopSelector: desktopSelectors.someTimesAgo,
          mobileSelector: mobileSelectors.someTimesAgo,
          isDesktop,
        }),
      );
      let link = isDesktop ? null : someTimesAgo.attr('href');

      const photosContainer = postNode.find(
        getSelectedSelector({
          desktopSelector: desktopSelectors.photos,
          mobileSelector: mobileSelectors.photosContainer,
          isDesktop,
        }),
      );

      const photosContainerSecondVariant = postNode.find(
        getSelectedSelector({
          desktopSelector: desktopSelectors.photosSecondVariant,
          mobileSelector: mobileSelectors.photosContainerSecondVariant,
          isDesktop,
        }),
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
          if (!link && isDesktop) {
            link = `${links.facebookDesktop}${$(photoContainer)
              .find('a')
              .attr('href')}`;
          }

          const src = $(photoContainer).find('img').attr('src');

          if (src) {
            photos.push(src);
          }
        });

      if (photosContainerSecondVariant && photos.length === 0) {
        if (isDesktop) {
          link = `${links.facebookDesktop}${photosContainerSecondVariant.attr(
            'href',
          )}`;
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
