import { Page } from 'playwright';
import { desktopFacebookSelectors } from '../../../../constants/selectors/facebook/desktop';
import { privatePass, privatePhone } from '../../../../../private/data';
import { sleep } from '../../../../lib/timeout/sleep';

export const authUser = async (page: Page, isDesktop: boolean) => {
  const authBar = await page.$(desktopFacebookSelectors.authBar);

  if (!authBar) {
    try {
      await page.fill('input[name="email"]', privatePhone, { timeout: 1500 });
      await page.fill('input[name="pass"]', privatePass, { timeout: 1500 });

      if (isDesktop) {
        await page.click(desktopFacebookSelectors.loginButton);
      }

      await sleep(1000);

      return true;
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return false;
};
