import { sleep } from '../../../../lib/timeout/sleep';
import { mobileSelectors } from '../../../../constants/selectors/mobile';
import { Page } from 'playwright';
import { asyncGenerator } from '../../../../lib/generators/async_generator';

const postsPerCycle = 5;

export const searchPosts = async ({
  page,
  noisyPopupClosed,
  isDesktop,
  postsByGroup,
}: {
  page: Page;
  noisyPopupClosed: boolean;
  isDesktop: boolean;
  postsByGroup: number;
}) => {
  let updatedNoisyPopupStatus = noisyPopupClosed;

  for await (const num of asyncGenerator(postsByGroup / postsPerCycle)) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    if (!isDesktop) {
      await sleep(100);

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
    } else {
      await sleep(500);
    }
  }

  return updatedNoisyPopupStatus;
};
