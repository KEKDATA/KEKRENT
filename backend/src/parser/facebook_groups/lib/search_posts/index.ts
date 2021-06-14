import { asyncGenerator } from '../../../../lib/generators/async_generator';
import { sleep } from '../../../../lib/timeout/sleep';
import { selectors } from '../../../../constants/selectors';
import { Page } from 'playwright';

const elementsPerPage = 20;

export const searchPosts = async ({
  page,
  postsByGroup,
}: {
  page: Page;
  postsByGroup: number;
}) => {
  let noisyPopupClosed = false;
  let total =
    postsByGroup < elementsPerPage
      ? elementsPerPage
      : postsByGroup + elementsPerPage;
  for await (let num of asyncGenerator(total / elementsPerPage)) {
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
        noisyPopupClosed = true;
      }
    }

    await sleep(100);

    await page.waitForSelector(selectors.withoutLoader, { timeout: 10000 });
  }
};
