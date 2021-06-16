import { sleep } from '../../../../lib/timeout/sleep';
import { selectors } from '../../../../constants/selectors';
import { Page } from 'playwright';

export const searchPosts = async ({
  page,
  noisyPopupClosed,
}: {
  page: Page;
  noisyPopupClosed: boolean;
}) => {
  let updatedNoisyPopupStatus = noisyPopupClosed;

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await sleep(100);

  const loadMore = await page.$(selectors.moreItem);
  if (loadMore) {
    await loadMore.click();
  }

  if (!noisyPopupClosed) {
    await sleep(100);

    const noisyPopup = await page.$(selectors.noisyLoginPopup);
    if (noisyPopup) {
      await noisyPopup.click();
      updatedNoisyPopupStatus = true;
    }
  }

  await sleep(100);

  await page.waitForSelector(selectors.withoutLoader, { timeout: 10000 });

  return updatedNoisyPopupStatus;
};
