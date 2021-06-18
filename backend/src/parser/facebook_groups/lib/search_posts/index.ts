import { sleep } from '../../../../lib/timeout/sleep';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { Page } from 'playwright';

export const searchPosts = async ({
  page,
  noisyPopupClosed,
  isDesktop,
}: {
  page: Page;
  noisyPopupClosed: boolean;
  isDesktop: boolean;
}) => {
  let updatedNoisyPopupStatus = noisyPopupClosed;

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await sleep(100);

  if (!isDesktop) {
    const loadMore = await page.$(mobileSelectors.moreItem);
    if (loadMore) {
      await loadMore.click();
    }

    if (!noisyPopupClosed) {
      await sleep(100);

      const noisyPopup = await page.$(mobileSelectors.noisyLoginPopup);
      if (noisyPopup) {
        await noisyPopup.click();
        updatedNoisyPopupStatus = true;
      }
    }

    await sleep(100);

    await page.waitForSelector(mobileSelectors.withoutLoader, {
      timeout: 10000,
    });
  }

  return updatedNoisyPopupStatus;
};
