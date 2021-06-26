import { Page } from 'playwright';
import { desktopSelectors } from '../../../../constants/selectors/desktop';
import { privatePass, privatePhone } from '../../../../../private/data';
import { sleep } from '../../../../lib/timeout/sleep';

export const authUser = async (page: Page, isDesktop: boolean) => {
  const authBar = await page.$(desktopSelectors.authBar);

  if (!authBar) {
    try {
      await page.fill('input[name="email"]', privatePhone, { timeout: 1500 });
      await page.fill('input[name="pass"]', privatePass, { timeout: 1500 });

      if (isDesktop) {
        await page.click(desktopSelectors.loginButton);
      }

      await sleep(1000);

      return true;
      // eslint-disable-next-line no-empty
    } catch {}
  }

  return false;
};
