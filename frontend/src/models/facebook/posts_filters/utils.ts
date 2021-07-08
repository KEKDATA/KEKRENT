import { PostsType } from 'contracts/posts/contract';
import { PostsFilter } from 'typings/posts_filters';

export const getFilteredPostsByDate = (
  posts: PostsType,
  filter: PostsFilter | null,
) =>
  [...posts].sort((a, b) => {
    const firstTimestamp = a.timestamp;
    const secondTimestamp = b.timestamp;

    if (filter === PostsFilter.FromMin) {
      return secondTimestamp - firstTimestamp;
    }

    return firstTimestamp - secondTimestamp;
  });

const getPriceFromString = (value: string) =>
  Number.parseFloat(value.replace(/[^0-9]+/g, '')) || 0;
export const getFilteredPostsByPrice = (
  posts: PostsType,
  filter: PostsFilter | null,
) =>
  [...posts].sort((a, b) => {
    const firstPrice = getPriceFromString(a.price);
    const secondPrice = getPriceFromString(b.price);

    if (filter === PostsFilter.FromMin) {
      return secondPrice - firstPrice;
    }

    return firstPrice - secondPrice;
  });
