import { chromium, devices } from 'playwright';
import { fazwazRentLink } from '../../constants/links/fazwaz_rent';
import { getHTML } from '../../lib/dom/get_html';
import cheerio from 'cheerio';
import { fazwazRentMobileSelectors } from '../../constants/selectors/fazwaz_rent/mobile';
import { findNode, getSelectedSelector, getText } from '../../lib/dom/node';
import { FazwazPost, FazwazPosts, PetsInfo } from '../../types/fazwaz';
import { asyncGenerator } from '../../lib/generators/async_generator';
import { nanoid } from 'nanoid';

interface ResultByPage {
  photos: FazwazPost['photos'];
  price: FazwazPost['price'];
  title: FazwazPost['title'];
  location: FazwazPost['location'];
  link: FazwazPost['link'];
}

const perPage = 30;
const isDesktop = false;

export const getParsedFazwazRent = async ({
  countOfSearchItems = 60,
}: {
  countOfSearchItems: number;
}) => {
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext(devices['iPhone X']);

  const totalParsedPosts = [];

  for await (const page of asyncGenerator(
    Math.ceil(countOfSearchItems / perPage),
  )) {
    const pageContext = await context.newPage();
    await pageContext.goto(`${fazwazRentLink}&page=${page + 1}`);

    const resultByPage: ResultByPage[] = [];

    const contentPage = await pageContext.evaluate(getHTML);
    const root = cheerio.load(contentPage);
    const postNodes = root(fazwazRentMobileSelectors.searchItem);

    postNodes.each(async (index, post) => {
      const postNode = root(post);

      const photosContainer = postNode.find(
        getSelectedSelector({
          desktopSelector: '',
          mobileSelector: fazwazRentMobileSelectors.imagesContainer,
          isDesktop,
        }),
      );

      const photos: FazwazPost['photos'] = [];
      photosContainer.children().each((_, photoContainer) => {
        const src = root(photoContainer).attr('src');

        if (src) {
          photos.push(src);
        }
      });

      const link =
        postNode
          .find(
            getSelectedSelector({
              desktopSelector: '',
              mobileSelector: fazwazRentMobileSelectors.link,
              isDesktop,
            }),
          )
          ?.attr('href') ?? null;

      const price = getText({
        mobileSelector: fazwazRentMobileSelectors.price,
        desktopSelector: '',
        node: postNode,
        isDesktop,
      })
        .replace(/\n/g, '')
        .replace('/mo', '');

      const title = getText({
        mobileSelector: fazwazRentMobileSelectors.title,
        desktopSelector: '',
        node: postNode,
        isDesktop,
      });

      const location = getText({
        mobileSelector: fazwazRentMobileSelectors.location,
        desktopSelector: '',
        node: postNode,
        isDesktop,
      }).trim();

      if (link) {
        resultByPage.push({
          photos,
          link,
          price,
          title,
          location,
        });
      }
    });

    totalParsedPosts.push(...resultByPage);
  }

  const infoAboutPosts: FazwazPosts = [];

  for await (const postNum of asyncGenerator(totalParsedPosts.length)) {
    try {
      const parsedPost = totalParsedPosts[postNum];

      const pageContext = await context.newPage();
      await pageContext.goto(parsedPost.link, { timeout: 20000 });

      const contentPage = await pageContext.evaluate(getHTML);
      const root = cheerio.load(contentPage);

      const body = root('body');

      const description = getText({
        desktopSelector: '',
        mobileSelector: fazwazRentMobileSelectors.description,
        node: body,
        isDesktop,
      });

      const features: Array<{ text: string; image?: string }> = [];

      const featuresNode = findNode({
        desktopSelector: '',
        mobileSelector: fazwazRentMobileSelectors.features,
        node: body,
        isDesktop,
      });

      featuresNode.children().each((_, featureElement) => {
        const featureNode = root(featureElement);
        const text = featureNode.text();
        const image = featureNode.find('img').attr('src');

        features.push({ text: text.replace(/\n/g, ''), image });
      });

      let petsInfo: PetsInfo = {
        isAllowed: false,
        isNA: false,
        description: 'N/A',
      };

      const basicInforms: Array<{ topic: string; info: string }> = [];

      const basicInformsNode = findNode({
        desktopSelector: '',
        mobileSelector: fazwazRentMobileSelectors.basicInforms,
        node: body,
        isDesktop,
      });

      basicInformsNode.children().each((_, basicInfoElement) => {
        const basicInfoNode = root(basicInfoElement);

        const topic = findNode({
          desktopSelector: '',
          mobileSelector: fazwazRentMobileSelectors.basicInfoTopic,
          node: basicInfoNode,
          isDesktop,
        }).contents()[0]?.data;
        const info = getText({
          desktopSelector: '',
          mobileSelector: fazwazRentMobileSelectors.basicInfo,
          node: basicInfoNode,
          isDesktop,
        });

        if (topic && info) {
          if (topic === 'Pets') {
            const isNotAllowed = info.includes('Not Allowed');
            const isNA = info.includes('N/A');

            petsInfo = {
              isAllowed: !isNotAllowed && !isNA,
              isNA,
              description: info,
            };
          }
          basicInforms.push({
            topic: topic.replace(/\n/g, ''),
            info: info.replace(/\n/g, ''),
          });
        }
      });

      const availableNow = getText({
        mobileSelector: fazwazRentMobileSelectors.availableNow,
        desktopSelector: '',
        isDesktop,
        node: body,
      });

      infoAboutPosts.push({
        ...parsedPost,
        id: nanoid(),
        description,
        features,
        basicInforms,
        availableNow,
        petsInfo,
      });
    } catch (err) {
      console.error(err);
    }
  }

  await browser.close();

  return infoAboutPosts;
};
