import { FacebookUniqPosts } from '../../../../types/facebook';
import cheerio from 'cheerio';
import { mobileFacebookSelectors } from '../../../../constants/selectors/facebook/mobile';
import { nanoid } from 'nanoid';
import { desktopFacebookSelectors } from '../../../../constants/selectors/facebook/desktop';
import { facebookLinks } from '../../../../constants/links/facebook';
import Root = cheerio.Root;
import Cheerio = cheerio.Cheerio;
import { parsePostDate } from '../parse_post_date';
import {
  findNode,
  getSelectedSelector,
  getText,
} from '../../../../lib/dom/node';

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
  let posts: FacebookUniqPosts = {};

  postNode.slice(fromIndexPost, toIndexPost).each(async (index, post) => {
    const postNode = root(post);

    const title = getText({
      mobileSelector: mobileFacebookSelectors.title,
      desktopSelector: desktopFacebookSelectors.title,
      node: postNode,
      isDesktop,
    });

    let address = '';
    let price = '';

    if (isAuth) {
      const priceContent = findNode({
        mobileSelector: mobileFacebookSelectors.price,
        desktopSelector: desktopFacebookSelectors.priceAuth,
        node: postNode,
        isDesktop,
      }).contents();

      price = priceContent[0]?.data ?? '';
      address = priceContent[2]?.data ?? '';
    } else {
      address = getText({
        mobileSelector: mobileFacebookSelectors.address,
        desktopSelector: desktopFacebookSelectors.address,
        node: postNode,
        isDesktop,
      });

      const priceContent = findNode({
        mobileSelector: mobileFacebookSelectors.price,
        desktopSelector: desktopFacebookSelectors.price,
        node: postNode,
        isDesktop,
      }).contents()[0]?.data;
      if (isDesktop && priceContent) {
        price = priceContent;
      } else {
        price = getText({
          mobileSelector: mobileFacebookSelectors.price,
          desktopSelector: desktopFacebookSelectors.price,
          node: postNode,
          isDesktop,
        });
      }
    }

    const descriptionNode = findNode({
      mobileSelector: mobileFacebookSelectors.description,
      desktopSelector: isAuth
        ? desktopFacebookSelectors.descriptionAuth
        : desktopFacebookSelectors.description,
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
      : postNode.find(mobileFacebookSelectors.linkedDescription).text();

    const someTimesAgo = postNode.find(
      getSelectedSelector({
        desktopSelector: desktopFacebookSelectors.someTimesAgo,
        mobileSelector: mobileFacebookSelectors.someTimesAgo,
        isDesktop,
      }),
    );
    let link = isDesktop ? null : someTimesAgo.attr('href');

    const photosContainer = postNode.find(
      getSelectedSelector({
        desktopSelector: isAuth
          ? desktopFacebookSelectors.photosAuth
          : desktopFacebookSelectors.photos,
        mobileSelector: mobileFacebookSelectors.photosContainer,
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
        desktopSelector: desktopFacebookSelectors.photosSecondVariant,
        mobileSelector: mobileFacebookSelectors.photosContainerSecondVariant,
        isDesktop,
      }),
    );
    if (photosContainerSecondVariant && photos.length === 0) {
      const href = photosContainerSecondVariant.attr('href');
      if (isDesktop && href) {
        link = `${facebookLinks.desktop}${href}`;
        const src = photosContainerSecondVariant.find('img').attr('src');

        if (src) {
          photos.push(src);
        }
      } else {
        photosContainerSecondVariant.children().each((_, photoContainer) => {
          const src = root(photoContainer)
            .find(mobileFacebookSelectors.photo)
            .attr('src');

          if (src) {
            photos.push(src);
          }
        });
      }
    }

    if (!link) {
      return;
    }

    let timestamp = new Date().getTime();
    let publishDate = '';

    if (isDesktop) {
      const timeNode = postNode.find(
        getSelectedSelector({
          mobileSelector: '',
          desktopSelector: isAuth
            ? desktopFacebookSelectors.dateAuth
            : desktopFacebookSelectors.date,
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

    if (!timestamp) {
      return;
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
