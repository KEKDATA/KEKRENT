import { Page } from 'playwright';
import { getHTML } from '../../../../lib/dom/get_html';
import cheerio from 'cheerio';
import { desktopFacebookSelectors } from '../../../../constants/selectors/facebook/desktop';
import { mobileFacebookSelectors } from '../../../../constants/selectors/facebook/mobile';

export const generatePostNode = async (page: Page, isDesktop: boolean) => {
  const contentPage = await page.evaluate(getHTML);
  const root = cheerio.load(contentPage);

  const postSelector = isDesktop
    ? desktopFacebookSelectors.post
    : mobileFacebookSelectors.post;
  const postNode = root(postSelector);

  return {
    root,
    postNode,
  };
};
