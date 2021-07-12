import { findNode } from '../../../../lib/dom/node';
import { phuketRentHouseMobileSelectors } from '../../../../constants/selectors/phuket_rent_house/mobile';
import { BasicInfo } from '../../../../types/phuket_rent_house';

export const getBasicInfo = ({
  node,
  isDesktop,
  mobileSelector,
  desktopSelector,
  root,
}: {
  node: cheerio.Cheerio;
  isDesktop: boolean;
  mobileSelector: string;
  desktopSelector: string;
  root: cheerio.Root;
}) => {
  const basicInfoNode = findNode({
    desktopSelector,
    mobileSelector,
    node,
    isDesktop,
  });

  if (basicInfoNode.length === 0) {
    return null;
  }

  const basicInfo: BasicInfo = {
    title: '',
    numberOptions: [],
    booleanOptions: [],
  };

  basicInfoNode.children().each((index, basicInfoFirstElement) => {
    const info = root(basicInfoFirstElement);

    if (index === 0) {
      const title = info.text();
      return (basicInfo.title = title);
    }

    const numberOption = info.find(
      phuketRentHouseMobileSelectors.basicInfoNumberOption,
    );
    if (numberOption.length > 0) {
      const count = numberOption.text();
      const description = info.find('strong').text();
      return basicInfo.numberOptions.push({
        count,
        description,
      });
    }

    const booleanOption = info.find(
      phuketRentHouseMobileSelectors.basicInfoBooleanOption,
    );
    if (booleanOption.length > 0) {
      const isChecked = booleanOption.attr('alt') === 'check';
      const description = info.text();
      return basicInfo.booleanOptions.push({ isChecked, description });
    }
  });

  return basicInfo;
};
