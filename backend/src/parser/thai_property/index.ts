import { chromium, devices } from 'playwright';
import { asyncGenerator } from '../../lib/generators/async_generator';
import { thaiPropertyLink } from '../../constants/links/thai_property';
import { getHTML } from '../../lib/dom/get_html';
import cheerio from 'cheerio';
import { thaiPropertyMobileSelectors } from '../../constants/selectors/thai_property/mobile';
import { findNode, getSelectedSelector, getText } from '../../lib/dom/node';
import { sleep } from '../../lib/timeout/sleep';

const perPage = 29;
const isDesktop = false;

export const getParsedThaiRentProperty = async ({
  countOfSearchItems = perPage,
}: {
  countOfSearchItems: number;
}) => {
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext(devices['iPhone X']);

  const links: string[] = [];

  for await (const page of asyncGenerator(
    Math.ceil(countOfSearchItems / perPage),
  )) {
    const pageContext = await context.newPage();

    try {
      await pageContext.goto(`${thaiPropertyLink}&page=${page + 1}`);
    } catch (err) {
      /**
       * Sometimes infinity load, but page ok
       */
      console.error(err);

      await sleep(2000);
    }

    try {
      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);
      const postNodes = root(thaiPropertyMobileSelectors.post);

      postNodes.each((_, postElement) => {
        const postNode = root(postElement);
        const href = postNode
          .find(
            getSelectedSelector({
              desktopSelector: '',
              mobileSelector: thaiPropertyMobileSelectors.link,
              isDesktop,
            }),
          )
          .attr('href');

        if (href) {
          links.push(href);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  for await (const linkIndex of asyncGenerator(links.length)) {
    const link = links[linkIndex];

    const pageContext = await context.newPage();

    try {
      await pageContext.goto(link);
    } catch (err) {
      /**
       * Sometimes infinity load, but page ok
       */
      console.error(err);

      await sleep(2000);
    }

    try {
      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);
      const body = root('body');

      const title = getText({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.title,
        isDesktop,
        node: body,
      });

      let location = getText({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.location,
        isDesktop,
        node: body,
      });

      if (!location) {
        const mapImage = findNode({
          desktopSelector: '',
          mobileSelector: thaiPropertyMobileSelectors.mapImage,
          isDesktop,
          node: body,
        }).attr('src');

        if (mapImage) {
          const mapCoordinatesPath = mapImage
            .split('/static_map/')[1]
            ?.replace('map_', '');
          const [lat, lon] = mapCoordinatesPath.split('_');

          if (lat && lon) {
            location = `${lat}${lon}`;
          }
        }
      }

      const priceTitle = getText({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.priceTitle,
        isDesktop,
        node: body,
      });

      const imagesContainerNode = findNode({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.images,
        isDesktop,
        node: body,
      });

      const imagesLinks: string[] = [];

      imagesContainerNode.children().each((_, imageElement) => {
        const imageNode = root(imageElement);
        const dataSrc = imageNode.attr('data-src');

        if (dataSrc) {
          imagesLinks.push(dataSrc);
        }
      });

      const descriptionNode = findNode({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.description,
        isDesktop,
        node: body,
      });

      const descriptions: string[] = [];

      descriptionNode.contents().each((_, descriptionElement) => {
        const partOfDescriptionNode = root(descriptionElement);
        const isForm = partOfDescriptionNode.get()[0]?.tagName === 'form';

        if (!isForm) {
          return descriptions.push(partOfDescriptionNode.text());
        }

        const hideContentNode = findNode({
          desktopSelector: '',
          mobileSelector: thaiPropertyMobileSelectors.contactsHideContent,
          isDesktop,
          node: partOfDescriptionNode,
        });
        const detail = hideContentNode.attr('data-detail');

        if (detail) {
          const nearestParent = hideContentNode.parent().get()[0];
          const parentTagName = nearestParent?.tagName;
          const isParentNotForm = parentTagName && parentTagName !== 'form';

          if (isParentNotForm) {
            return descriptions.push(
              `${nearestParent.children[0].data} ${detail}`,
            );
          }

          descriptions.push(detail);
        }
      });

      const features: Array<{ name: string; value: string }> = [];

      const featuresNode = findNode({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.featured,
        isDesktop,
        node: body,
      });

      featuresNode.children().each((_, featureElement) => {
        const featureNode = root(featureElement);

        const [valueNode, nameNode] = featureNode
          .find('.text-center')
          .contents();

        const name = nameNode.data;
        const value = valueNode.data;

        if (name && value) {
          features.push({
            name,
            value,
          });
        }
      });

      const facilities: string[] = [];

      const facilitiesNode = findNode({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.facilities,
        isDesktop,
        node: body,
      });

      facilitiesNode.children().each((_, facilityElement) => {
        const facilityNode = root(facilityElement);

        facilities.push(facilityNode.text());
      });

      const linkToRequestDetails = findNode({
        desktopSelector: '',
        mobileSelector: thaiPropertyMobileSelectors.linkToRequestDetails,
        isDesktop,
        node: body,
      }).attr('href');

      console.log({
        title,
        location,
        priceTitle,
        imagesLinks,
        descriptions,
        features,
        facilities,
        linkToRequestDetails,
      });
    } catch (err) {
      console.error(err);
    }
  }
};

getParsedThaiRentProperty({ countOfSearchItems: 1 });
