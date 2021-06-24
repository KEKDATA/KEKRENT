import { UniqPosts } from '../../../../types/posts';

interface FilteredPostsBySettings {
  posts: UniqPosts;
  timeStamps: number[] | null;
  minPrice?: string;
  maxPrice?: string;
}

export const getFilteredPostsBySettings = ({
  posts,
  timeStamps,
  minPrice,
  maxPrice,
}: FilteredPostsBySettings) => {
  let filteredPosts: UniqPosts = {};
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

    filteredPosts[stupidId] = bodyOfPost;
  }

  return filteredPosts;
};
