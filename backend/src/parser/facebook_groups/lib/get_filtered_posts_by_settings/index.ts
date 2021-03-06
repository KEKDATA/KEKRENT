import { FacebookUniqPosts } from '../../../../types/facebook';

interface FilteredPostsBySettings {
  posts: FacebookUniqPosts;
  timeStamps: number[] | null;
  groupTitle?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const getFilteredPostsBySettings = ({
  posts,
  timeStamps,
  minPrice,
  maxPrice,
  groupTitle,
}: FilteredPostsBySettings) => {
  let filteredPosts: FacebookUniqPosts = {};
  const normalizedPosts = Object.entries(posts);
  const [from, to] = timeStamps || [];

  for (let i = 0; i < normalizedPosts.length; i++) {
    const post = normalizedPosts[i];
    const stupidId = post[0];
    const bodyOfPost = post[1];
    const isContentExist =
      bodyOfPost.description.length > 0 || bodyOfPost.title.length > 0;

    if (!isContentExist) {
      break;
    }

    if (timeStamps) {
      const isTimeStampsEnough =
        bodyOfPost.timestamp >= from && bodyOfPost.timestamp <= to;

      if (!isTimeStampsEnough) {
        break;
      }
    }

    if (minPrice || maxPrice) {
      let priceMoreThanMin = true;

      if (minPrice) {
        priceMoreThanMin = Number(bodyOfPost.price) >= Number(minPrice);
      }

      let priceLessThanMax = true;
      if (maxPrice) {
        priceLessThanMax = Number(bodyOfPost.price) <= Number(maxPrice);
      }

      if (!priceMoreThanMin && !priceLessThanMax) {
        break;
      }
    }

    if (groupTitle) {
      bodyOfPost.groupTitle = groupTitle;
    }

    filteredPosts[stupidId] = bodyOfPost;
  }

  return filteredPosts;
};
