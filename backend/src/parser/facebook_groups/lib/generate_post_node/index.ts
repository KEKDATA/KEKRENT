import { Page } from 'playwright';
import { getHTML } from '../../../../lib/dom/get_html';
import cheerio from 'cheerio';
import { desktopSelectors } from '../../../../constants/selectors/desktop';
import { mobileSelectors } from '../../../../constants/selectors/mobile';

export const generatePostNode = async (page: Page, isDesktop: boolean) => {
  const contentPage = await page.evaluate(getHTML);
  const root = cheerio.load(contentPage);

  const postSelector = isDesktop ? desktopSelectors.post : mobileSelectors.post;
  const postNode = root(postSelector);

  return {
    root,
    postNode,
  };
};
