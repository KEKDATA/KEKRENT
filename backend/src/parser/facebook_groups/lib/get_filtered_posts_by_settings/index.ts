import { Posts } from '../../../../types/posts';

interface FilteredPostsBySettings {
  posts: Posts;
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
  let normalizedPosts = posts;

  if (timeStamps) {
    const [from, to] = timeStamps;
    normalizedPosts = normalizedPosts.filter(
      ({ timestamp }) => timestamp >= from && timestamp <= to,
    );
  }

  if (minPrice || maxPrice) {
    normalizedPosts = normalizedPosts.filter(({ price }) => {
      let priceMoreThanMin = true;
      if (minPrice) {
        priceMoreThanMin = Number(price) >= Number(minPrice);
      }

      let priceLessThanMax = true;
      if (maxPrice) {
        priceLessThanMax = Number(price) <= Number(maxPrice);
      }

      return priceMoreThanMin || priceLessThanMax;
    });
  }

  return normalizedPosts;
};
