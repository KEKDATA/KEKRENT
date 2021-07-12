const posts = '.listItem';
/**
 * Link website + href node
 */
const link = 'a[title="View details"]';

const loadMore = '#loadMore';
const loadMoreLoading = '.loadMore.loading';

/**
 * [data-price]
 */
const price = '.pill.rcr';
const basicInfoFirst = '.data.first > ul';
const basicInfoLast = '.data.last > ul';

/**
 *
 * Basic info item = number type or boolean type
 * Boolean option = check/no alt attr
 */
const basicInfoTitleSection = '.type.rct';
const basicInfoBooleanOption = 'img.check.rc';
const basicInfoNumberOption = '.number.rc';

const title = '.automated > span';
/**
 * Many p tags included
 */
const mainText = '.maintext';

const photosLinks = '.row.photos .lightbox';
/**
 * Children by photosLinks
 */
const photo = '.cphoto .lazy';

/**
 * Link to google map included
 */
const siteMap = '.sitemap.screen';

export const phuketRentHouseMobileSelectors = {
  posts,
  link,
  loadMore,
  loadMoreLoading,
  price,
  basicInfoFirst,
  basicInfoLast,
  basicInfoTitleSection,
  basicInfoBooleanOption,
  basicInfoNumberOption,
  title,
  mainText,
  photosLinks,
  photo,
  siteMap,
};
