import { getThaiPropertyApi } from 'api/thai_property';
import {
  ThaiPropertyContract,
  ThaiPropertyPostsType,
  ThaiPropertyType,
} from 'contracts/thai_property/contract';
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  restore,
  sample,
} from 'effector';
import { createGate } from 'effector-react';
import { withPersist } from 'models/persist/model';
import { scrolledToLastViewPostCleared } from 'models/scroll_to_last_viewed_post/model';
import { condition } from 'patronum';

export const ThaiPropertyGate = createGate();

const prependRequest = createEvent();
const previousPostsTriggered = createEvent();

export const getThaiPropertyFx = createEffect(getThaiPropertyApi);

forward({
  from: getThaiPropertyFx.fail,
  to: previousPostsTriggered,
});

guard({
  source: getThaiPropertyFx.pending,
  clock: ThaiPropertyGate.open,
  filter: (isLoading) => !isLoading,
  target: prependRequest,
});

condition({
  source: prependRequest,
  if: () => Boolean(window.navigator.onLine),
  then: getThaiPropertyFx,
  else: previousPostsTriggered,
});

export const thaiPropertyReceived = guard<unknown, ThaiPropertyType>(
  getThaiPropertyFx.doneData,
  {
    filter: ThaiPropertyContract.guard,
  },
);

const $nonFiltersPosts = withPersist(createStore<ThaiPropertyPostsType>([]), {
  maxSize: 20,
  key: 'thaiProperty',
});

export const $thaiPropertyPosts = createStore<ThaiPropertyPostsType>([]);

sample({
  clock: previousPostsTriggered,
  fn: () => {
    const previousPosts = localStorage.getItem('thaiProperty');

    if (previousPosts) {
      return JSON.parse(previousPosts) as ThaiPropertyPostsType;
    }

    return [];
  },
  target: [$nonFiltersPosts, $thaiPropertyPosts],
});

sample({
  clock: thaiPropertyReceived.map(({ posts }) => posts),
  target: [$nonFiltersPosts, $thaiPropertyPosts],
});

export const $thaiPropertyFacilities = restore(
  thaiPropertyReceived.map(({ totalFacilities }) => totalFacilities),
  [],
);

export const filtersThaiPropertyCleared = createEvent<unknown>();

export const filterTotalFacilitiesSubmitted = createEvent();
export const filterTotalFacilitiesSelected =
  createEvent<ThaiPropertyType['totalFacilities']>();
export const $checkedTotalFacilities = restore(
  filterTotalFacilitiesSelected,
  [],
).reset(filtersThaiPropertyCleared);

sample({
  source: [$checkedTotalFacilities, $nonFiltersPosts],
  clock: filterTotalFacilitiesSubmitted,
  fn: ([checkedTotalFacilities, posts]) =>
    posts.filter((post) => {
      const isSomeFacilityFounded = post.facilities.some((facility) =>
        checkedTotalFacilities.includes(facility),
      );

      return isSomeFacilityFounded;
    }),
  target: $thaiPropertyPosts,
});

forward({
  from: [filterTotalFacilitiesSubmitted, filtersThaiPropertyCleared],
  to: scrolledToLastViewPostCleared,
});

sample({
  source: $nonFiltersPosts,
  clock: filtersThaiPropertyCleared,
  target: $thaiPropertyPosts,
});
