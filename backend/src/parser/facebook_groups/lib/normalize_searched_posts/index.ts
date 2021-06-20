import { UniqPosts } from '../../../../types/posts';
import cheerio from 'cheerio';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { nanoid } from 'nanoid';
import { desktopSelectors } from '../../../../constants/selectors/desktop';
import { links } from '../../../../constants/links';
import Root = cheerio.Root;
import Cheerio = cheerio.Cheerio;

interface ParseNodeParams {
  desktopSelector: string;
  mobileSelector: string;
  node: cheerio.Cheerio;
  isDesktop: boolean;
}

const getSelectedSelector = ({
  desktopSelector,
  mobileSelector,
  isDesktop,
}: {
  desktopSelector: ParseNodeParams['desktopSelector'];
  mobileSelector: ParseNodeParams['mobileSelector'];
  isDesktop: ParseNodeParams['isDesktop'];
}) => (isDesktop ? desktopSelector : mobileSelector);

const findNode = ({
  desktopSelector,
  mobileSelector,
  node,
  isDesktop,
}: ParseNodeParams) =>
  node.find(
    getSelectedSelector({ desktopSelector, mobileSelector, isDesktop }),
  );

const getText = (params: ParseNodeParams) => findNode(params)?.text();

export const normalizeSearchedPosts = async ({
  selectedGroupId,
  isDesktop,
  fromIndexPost,
  toIndexPost,
  root,
  postNode,
}: {
  selectedGroupId: number | string;
  isDesktop: boolean;
  fromIndexPost: number;
  toIndexPost: number;
  root: Root;
  postNode: Cheerio;
}) => {
  let posts: UniqPosts = {};

  postNode.slice(fromIndexPost, toIndexPost).each(async (index, post) => {
    const postNode = root(post);

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

    const descriptionNode = findNode({
      mobileSelector: mobileSelectors.description,
      desktopSelector: desktopSelectors.description,
      node: postNode,
      isDesktop,
    });

    const descriptions: string[] = [];

    if (isDesktop) {
      descriptionNode.children().each((_, node) => {
        const nodeHtml = root(node).html();
        if (nodeHtml) {
          nodeHtml.split('<br>').forEach(partOfHtml => {
            const isHTML = /^/.test(partOfHtml);

            let result = partOfHtml;

            if (isHTML) {
              result = root(cheerio.parseHTML(partOfHtml)).text();
            }

            descriptions.push(result);
          });
        }
      });
    }

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
    let publishDate = '';

    if (!isDesktop) {
      const dataFt = postNode.attr('data-ft');
      const parsedDataFt = JSON.parse(dataFt as string);
      const publishTime =
        parsedDataFt?.page_insights[selectedGroupId]?.post_context
          ?.publish_time;
      const date = publishTime ? new Date(publishTime * 1000) : null;
      timestamp = date?.getTime() ?? timestamp;
      publishDate = date?.toLocaleDateString('en-US') ?? someTimesAgo.text();
    }

    const photos: string[] = [];

    photosContainer.children().each((_, photoContainer) => {
      if (!link && isDesktop) {
        link = `${links.facebookDesktop}${root(photoContainer)
          .find('a')
          .attr('href')}`;
      }

      const src = root(photoContainer).find('img').attr('src');

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
        photosContainerSecondVariant.children().each((_, photoContainer) => {
          const src = root(photoContainer)
            .find(mobileSelectors.photo)
            .attr('src');

          if (src) {
            photos.push(src);
          }
        });
      }
    }

    const resultedDescription = descriptions;
    if (linkedDescription) {
      resultedDescription.push(linkedDescription);
    }
    const stupidId = `${resultedDescription.join('').slice(0, 50)}`;

    posts[stupidId] = {
      id: nanoid(10),
      title,
      price,
      address,
      description: resultedDescription,
      publishDate,
      timestamp,
      link: link as string,
      photos,
    };
  });

  return posts;
};
