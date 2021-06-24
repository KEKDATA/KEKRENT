import { createEvent, createStore, sample } from 'effector-root';
import {
  $nonFiltersPosts,
  $posts,
  postsCleared,
  postsUpdated,
} from 'models/posts/model';

export enum PostsFilter {
  FromMin = 'from_min',
  FromMax = 'from_max',
}

const toggleFilter = (filterValue: PostsFilter | null) => {
  if (filterValue === null || filterValue === PostsFilter.FromMax) {
    return PostsFilter.FromMin;
  }

  if (filterValue === PostsFilter.FromMin) {
    return PostsFilter.FromMax;
  }

  return null;
};

export const filterPostsByPriceToggled = createEvent<unknown>();
export const filterPostsByDateToggled = createEvent<unknown>();
export const filterPostsCleared = createEvent<unknown>();

export const $priceFilter = createStore<PostsFilter | null>(null)
  .on(filterPostsByPriceToggled, toggleFilter)
  .reset([postsCleared, filterPostsByDateToggled, filterPostsCleared]);

export const $dateFilter = createStore<PostsFilter | null>(null)
  .on(filterPostsByDateToggled, toggleFilter)
  .reset([postsCleared, filterPostsByPriceToggled, filterPostsCleared]);

const getPriceFromString = (value: string) =>
  parseFloat(value.replace(/[^0-9]+/g, '')) || 0;
sample({
  clock: $priceFilter,
  source: $posts,
  fn: (posts, priceFilter) => {
    if (!priceFilter) {
      return posts;
    }

    return [...posts].sort((a, b) => {
      const firstPrice = getPriceFromString(a.price);
      const secondPrice = getPriceFromString(b.price);

      if (priceFilter === PostsFilter.FromMin) {
        return secondPrice - firstPrice;
      }

      return firstPrice - secondPrice;
    });
  },
  target: postsUpdated,
});

sample({
  clock: $dateFilter,
  source: $posts,
  fn: (posts, dateFilter) => {
    if (!dateFilter) {
      return posts;
    }

    return [...posts].sort((a, b) => {
      const firstTimestamp = a.timestamp;
      const secondTimestamp = b.timestamp;

      if (dateFilter === PostsFilter.FromMin) {
        return secondTimestamp - firstTimestamp;
      }

      return firstTimestamp - secondTimestamp;
    });
  },
  target: postsUpdated,
});

sample({
  clock: filterPostsCleared,
  source: $nonFiltersPosts,
  target: postsUpdated,
});
