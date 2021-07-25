import { FacebookPosts } from '../../../../types/facebook';

interface PostsWithSettings {
  posts: FacebookPosts;
  timeStamps: number[] | null;
  minPrice?: string;
  maxPrice?: string;
  groupTitle?: string;
}

export const getFilteredScheduledPosts = ({
  posts,
  timeStamps,
  minPrice,
  maxPrice,
  groupTitle,
}: PostsWithSettings) => {
  const [from, to] = timeStamps || [];
  const filteredPosts: FacebookPosts = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    const isContentExist = post.description.length > 0 || post.title.length > 0;

    if (!isContentExist) {
      break;
    }

    if (timeStamps) {
      const isTimeStampsEnough = post.timestamp >= from && post.timestamp <= to;

      if (!isTimeStampsEnough) {
        break;
      }
    }

    if (minPrice || maxPrice) {
      let priceMoreThanMin = true;

      if (minPrice) {
        priceMoreThanMin = Number(post.price) >= Number(minPrice);
      }

      let priceLessThanMax = true;
      if (maxPrice) {
        priceLessThanMax = Number(post.price) <= Number(maxPrice);
      }

      if (!priceMoreThanMin && !priceLessThanMax) {
        break;
      }
    }

    if (groupTitle) {
      post.groupTitle = groupTitle;
    }

    filteredPosts.push(post);
  }

  return filteredPosts;
};
