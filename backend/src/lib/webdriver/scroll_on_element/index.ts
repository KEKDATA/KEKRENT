import { Page } from 'playwright';

export const scrollOnElement = async (page: Page, selector: string) => {
  await page.$eval(selector, element => {
    element.scrollIntoView();
  });
};
