import { UniqPosts } from '../../../../types/posts';
import cheerio from 'cheerio';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { nanoid } from 'nanoid';
import { desktopSelectors } from '../../../../constants/selectors/desktop';
import { facebookLinks } from '../../../../constants/links/facebook';
import Root = cheerio.Root;
import Cheerio = cheerio.Cheerio;
import { parsePostDate } from '../parse_post_date';

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
  isAuth,
}: {
  selectedGroupId: number | string;
  isDesktop: boolean;
  fromIndexPost: number;
  toIndexPost: number;
  root: Root;
  postNode: Cheerio;
  isAuth: boolean;
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

    let address = '';
    let price = '';

    if (isAuth) {
      const priceContent = findNode({
        mobileSelector: mobileSelectors.price,
        desktopSelector: desktopSelectors.priceAuth,
        node: postNode,
        isDesktop,
      }).contents();

      price = priceContent[0]?.data ?? '';
      address = priceContent[2]?.data ?? '';
    } else {
      address = getText({
        mobileSelector: mobileSelectors.address,
        desktopSelector: desktopSelectors.address,
        node: postNode,
        isDesktop,
      });

      const priceContent = findNode({
        mobileSelector: mobileSelectors.price,
        desktopSelector: desktopSelectors.price,
        node: postNode,
        isDesktop,
      }).contents()[0]?.data;
      if (isDesktop && priceContent) {
        price = priceContent;
      } else {
        price = getText({
          mobileSelector: mobileSelectors.price,
          desktopSelector: desktopSelectors.price,
          node: postNode,
          isDesktop,
        });
      }
    }

    const descriptionNode = findNode({
      mobileSelector: mobileSelectors.description,
      desktopSelector: isAuth
        ? desktopSelectors.descriptionAuth
        : desktopSelectors.description,
      node: postNode,
      isDesktop,
    });

    const descriptions: string[] = [];

    if (isDesktop) {
      descriptionNode.children().each((_, node) => {
        const partOfDescription = root(node).children();

        partOfDescription.each((_, partOfDescriptionElement) => {
          descriptions.push(root(partOfDescriptionElement).text());
        });

        if (partOfDescription.length === 0) {
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
        desktopSelector: isAuth
          ? desktopSelectors.photosAuth
          : desktopSelectors.photos,
        mobileSelector: mobileSelectors.photosContainer,
        isDesktop,
      }),
    );

    const photos: string[] = [];

    photosContainer.children().each((_, photoContainer) => {
      if (!link && isDesktop) {
        const href = root(photoContainer).find('a').attr('href');

        if (href) {
          link = `${facebookLinks.desktop}${href}`;
        }
      }

      const src = root(photoContainer).find('img').attr('src');

      if (src) {
        photos.push(src);
      }
    });

    const photosContainerSecondVariant = postNode.find(
      getSelectedSelector({
        desktopSelector: desktopSelectors.photosSecondVariant,
        mobileSelector: mobileSelectors.photosContainerSecondVariant,
        isDesktop,
      }),
    );
    if (photosContainerSecondVariant && photos.length === 0) {
      if (isDesktop) {
        link = `${facebookLinks.desktop}${photosContainerSecondVariant.attr(
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

    let timestamp = new Date().getTime();
    let publishDate = '';

    if (isDesktop) {
      const timeNode = postNode.find(
        getSelectedSelector({
          mobileSelector: '',
          desktopSelector: isAuth
            ? desktopSelectors.dateAuth
            : desktopSelectors.date,
          isDesktop,
        }),
      );

      const date = parsePostDate(timeNode, root, isAuth);

      timestamp = date.getTime();
      publishDate = date?.toLocaleDateString('en-US') ?? someTimesAgo.text();
    } else {
      const dataFt = postNode.attr('data-ft');
      const parsedDataFt = JSON.parse(dataFt as string);
      const publishTime =
        parsedDataFt?.page_insights[selectedGroupId]?.post_context
          ?.publish_time;
      const date = publishTime ? new Date(publishTime * 1000) : null;
      timestamp = date?.getTime() ?? timestamp;
      publishDate = date?.toLocaleDateString('en-US') ?? someTimesAgo.text();
    }

    const resultedDescription = descriptions;
    if (linkedDescription) {
      resultedDescription.push(linkedDescription);
    }
    link = link || '';
    const stupidId =
      link.length > 0
        ? link
        : `${title}${price}${resultedDescription.join('').slice(0, 50)}`;

    posts[stupidId] = {
      id: nanoid(10),
      title,
      price,
      address,
      description: resultedDescription,
      publishDate,
      timestamp,
      link,
      photos,
    };
  });

  return posts;
};
