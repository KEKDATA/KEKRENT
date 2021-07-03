import { sleep } from '../../../../lib/timeout/sleep';
import { mobileFacebookSelectors } from '../../../../constants/selectors/facebook/mobile';
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
    await page.evaluate(() => window.scrollTo(0, document.body?.scrollHeight));

    if (!isDesktop) {
      await sleep(100);

      const loadMore = await page.$(mobileFacebookSelectors.moreItem);
      if (loadMore) {
        await loadMore.click();
      }

      if (!noisyPopupClosed) {
        await sleep(100);

        const noisyPopup = await page.$(
          mobileFacebookSelectors.noisyLoginPopup,
        );
        if (noisyPopup) {
          await noisyPopup.click();
          updatedNoisyPopupStatus = true;
        }
      }

      await sleep(100);

      await page.waitForSelector(mobileFacebookSelectors.withoutLoader, {
        timeout: 10000,
      });
    } else {
      await sleep(500);

      // Fallback - trigger to load new posts
      await page.evaluate(() => window.scrollTo(0, 0));
    }
  }

  return updatedNoisyPopupStatus;
};
