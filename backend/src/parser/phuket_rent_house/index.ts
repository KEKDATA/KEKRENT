import { chromium, devices } from 'playwright';
import { asyncGenerator } from '../../lib/generators/async_generator';
import { phuketRentHouseLink } from '../../constants/links/phuket_rent_house';
import { getHTML } from '../../lib/dom/get_html';
import cheerio from 'cheerio';
import { phuketRentHouseMobileSelectors } from '../../constants/selectors/phuket_rent_house/mobile';
import { findNode, getSelectedSelector, getText } from '../../lib/dom/node';
import { getBasicInfo } from './lib/basic_info';
import { sleep } from '../../lib/timeout/sleep';
import { PhuketRentHouse, Post } from '../../types/phuket_rent_house';

const perPage = 10;
const isDesktop = false;

export const getParsedPhuketRentHouse = async ({
  countOfSearchItems = 24,
}: {
  countOfSearchItems: number;
}): Promise<PhuketRentHouse> => {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext(devices['iPhone X']);

  const links: Set<string> = new Set();

  for await (const page of asyncGenerator(
    Math.ceil(countOfSearchItems / perPage),
  )) {
    if (links.size >= countOfSearchItems) {
      break;
    }
    const pageContext = await context.newPage();

    let isInfinityLoader = false;

    try {
      await pageContext.goto(`${phuketRentHouseLink}/page/${page + 1}`);
    } catch (err) {
      /**
       * Sometimes infinity load, but page ok
       */
      console.error(err);
      isInfinityLoader = true;
    }

    try {
      if (isInfinityLoader) {
        await sleep(2000);
      }

      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);
      const postNodes = root(phuketRentHouseMobileSelectors.posts);

      postNodes.each((index, postElement) => {
        const postNode = root(postElement);

        const href = postNode
          .find(
            getSelectedSelector({
              desktopSelector: '',
              mobileSelector: phuketRentHouseMobileSelectors.link,
              isDesktop,
            }),
          )
          .attr('href');

        if (href) {
          const link = `${phuketRentHouseLink}${href}`;

          links.add(link);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  let totalBooleanOptions: {
    [key: string]: {
      isChecked: boolean;
      description: string;
    };
  } = {};

  const infoAboutPosts: Post[] = [];
  const normalizedLinks = [...links];

  for await (const linkIndex of asyncGenerator(normalizedLinks.length)) {
    try {
      const link = normalizedLinks[linkIndex];

      const pageContext = await context.newPage();
      await pageContext.goto(link, { timeout: 20000 });

      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);
      const body = root('body');

      const priceNodes = findNode({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.price,
        node: body,
        isDesktop,
      });

      let price = null;
      const aboutPrices: string[] = [];

      priceNodes.each((_, priceElement) => {
        const priceNode = root(priceElement);

        const from = priceNode.find('small').text();
        const priceText = priceNode.find('strong').text();
        const perDate = priceNode.find('.rc').text();

        if (perDate.toLowerCase().includes('month')) {
          price = priceNode.attr('data-price') || null;
        }

        aboutPrices.push(`${from} ${priceText} ${perDate}`);
      });

      const basicInfoFirst = getBasicInfo({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.basicInfoFirst,
        node: body,
        isDesktop,
        root,
      });

      const basicInfoLast = getBasicInfo({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.basicInfoLast,
        node: body,
        isDesktop,
        root,
      });

      [
        ...(basicInfoFirst?.booleanOptions ?? []),
        ...(basicInfoLast?.booleanOptions ?? []),
      ].forEach(option => (totalBooleanOptions[option.description] = option));

      const title = getText({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.title,
        node: body,
        isDesktop,
      });

      const mainTextNode = findNode({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.mainText,
        node: body,
        isDesktop,
      });

      const texts: string[] = [];

      mainTextNode.children().each((_, textElement) => {
        const textNode = root(textElement);
        const text = textNode.text();

        if (text) {
          texts.push(text);
        }
      });

      const photosLinksNodes = findNode({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.photosLinks,
        isDesktop,
        node: body,
      });

      const photosLinks: string[] = [];

      photosLinksNodes.each((_, photoLinkElement) => {
        const photoLinkNode = root(photoLinkElement);

        const photoLink = photoLinkNode
          .find(phuketRentHouseMobileSelectors.photo)
          .attr('src');

        if (photoLink) {
          photosLinks.push(photoLink);
          return;
        }

        const fallbackToLink = photoLinkNode.attr('href');

        if (fallbackToLink) {
          photosLinks.push(fallbackToLink);
        }
      });

      const siteMapLink = findNode({
        desktopSelector: '',
        mobileSelector: phuketRentHouseMobileSelectors.siteMap,
        isDesktop,
        node: body,
      }).attr('href');

      infoAboutPosts.push({
        link,
        price,
        aboutPrices,
        basicInfoFirst,
        basicInfoLast,
        title,
        texts,
        photosLinks,
        siteMapLink: siteMapLink ? `https:${siteMapLink}` : null,
      });
    } catch (err) {
      console.error(err);
    }
  }

  await browser.close();

  return {
    posts: infoAboutPosts,
    totalBooleanOptions: Object.values(totalBooleanOptions).map(
      ({ description }) => description,
    ),
  };
};
