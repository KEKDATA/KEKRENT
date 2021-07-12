import { chromium, devices } from 'playwright';
import { asyncGenerator } from '../../lib/generators/async_generator';
import { phuketRentHouseLink } from '../../constants/links/phuket_rent_house';
import { getHTML } from '../../lib/dom/get_html';
import cheerio from 'cheerio';
import { phuketRentHouseMobileSelectors } from '../../constants/selectors/phuket_rent_house/mobile';
import { findNode, getSelectedSelector, getText } from '../../lib/dom/node';
import { getBasicInfo } from './lib/basic_info';
import { sleep } from '../../lib/timeout/sleep';
import { PhuketRentHouse } from '../../types/phuket_rent_house';

const perPage = 8;
const isDesktop = false;

export const getParsedPhuketRentHouse = async ({
  countOfSearchItems = 24,
}: {
  countOfSearchItems: number;
}) => {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext(devices['iPhone X']);

  const links: PhuketRentHouse['link'][] = [];

  for await (const page of asyncGenerator(
    Math.ceil(countOfSearchItems / perPage),
  )) {
    const pageContext = await context.newPage();

    let isInifityLoad = false;

    try {
      await pageContext.goto(`${phuketRentHouseLink}/page/${page + 1}`);
    } catch (err) {
      /**
       * Sometimes infinity load, but page ok
       */
      console.error(err);
      isInifityLoad = true;
    }

    try {
      if (isInifityLoad) {
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

          links.push(link);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  const infoAboutPosts: PhuketRentHouse[] = [];

  for await (const linkIndex of asyncGenerator(links.length)) {
    try {
      const link = links[linkIndex];

      const pageContext = await context.newPage();
      await pageContext.goto(link, { timeout: 20000 });

      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);
      const body = root('body');

      const price =
        findNode({
          desktopSelector: '',
          mobileSelector: phuketRentHouseMobileSelectors.price,
          node: body,
          isDesktop,
        }).attr('data-price') || null;

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

  return infoAboutPosts;
};
