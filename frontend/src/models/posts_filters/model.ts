import { createEvent, createStore, restore, sample } from 'effector-root';
import { $posts, postsCleared, postsUpdated } from 'models/posts/model';

export enum PriceFilter {
  FromMin = 'from_min',
  FromMax = 'from_max',
}

export const filterPostsByPriceToggled = createEvent<unknown>();
export const $priceFilter = createStore<PriceFilter | null>(null)
  .on(filterPostsByPriceToggled, (prev) => {
    if (prev === null || prev === PriceFilter.FromMax) {
      return PriceFilter.FromMin;
    }

    if (prev === PriceFilter.FromMin) {
      return PriceFilter.FromMax;
    }

    return null;
  })
  .reset(postsCleared);

const getPriceFromString = (value: string) =>
  parseFloat(value.replace(/[^0-9]+/g, '')) || 0;
sample({
  clock: $priceFilter,
  source: $posts,
  fn: (posts, priceFilter) => {
    return [...posts].sort((a, b) => {
      const firstPrice = getPriceFromString(a.price);
      const secondPrice = getPriceFromString(b.price);

      if (priceFilter === PriceFilter.FromMin) {
        return secondPrice - firstPrice;
      }

      return firstPrice - secondPrice;
    });
  },
  target: postsUpdated,
});
