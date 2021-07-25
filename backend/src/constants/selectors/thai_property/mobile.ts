const post = '#search-results > .search-list';
const link = '.left-block > a';

/**
 * Post selectors
 */

const title = '.page-title > a';
const location = '.location';
const priceTitle = '.price-title';
const price = 'input[name="price"]';

/**
 * ul -> li -> data-src
 */
const images = '#hiddenGallery > ul';

/**
 * Split by br tag
 */
const description = '.text-description';

/**
 * Use data-detail selector
 */
const contactsHideContent = '.hide-content';

/**
 * ul -> li -> 1 child - number, 2 child - description
 */
const featured = '.key-featured';

/**
 * ul -> li -> text
 */
const facilities = '.facilities';

const linkToRequestDetails = '.user-company-detail > form > a:last-child';

/**
 * Src like
 * https://photos.dotproperty.co.th/static_map/map_7.816813_98.340119.jpg
 * parse and get coordinates after /map_
 */
const mapImage = '#go-to-map-mobile > img';

export const thaiPropertyMobileSelectors = {
  post,
  link,
  title,
  location,
  price,
  priceTitle,
  images,
  description,
  contactsHideContent,
  featured,
  facilities,
  mapImage,
  linkToRequestDetails,
};
