import { getPhuketRentHouseApi } from 'api/phuket_rent_house';
import {
  PhuketRentHouseContract,
  PhuketRentHousePostsType,
  PhuketRentHouseType,
} from 'contracts/phuket_rent_house/contract';
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

export const PhuketRentHouseGate = createGate();

const prependRequest = createEvent();
const previousPostsTriggered = createEvent();

export const getPhuketRentHouseFx = createEffect(getPhuketRentHouseApi);

forward({
  from: getPhuketRentHouseFx.fail,
  to: previousPostsTriggered,
});

guard({
  source: getPhuketRentHouseFx.pending,
  clock: PhuketRentHouseGate.open,
  filter: (isLoading) => !isLoading,
  target: prependRequest,
});

condition({
  source: prependRequest,
  if: () => Boolean(window.navigator.onLine),
  then: getPhuketRentHouseFx,
  else: previousPostsTriggered,
});

export const phuketRentHouseReceived = guard<unknown, PhuketRentHouseType>(
  getPhuketRentHouseFx.doneData,
  {
    filter: PhuketRentHouseContract.guard,
  },
);

const $nonFiltersPosts = withPersist(
  createStore<PhuketRentHousePostsType>([]),
  {
    maxSize: 20,
    key: 'phuketRentHousePosts',
  },
);

export const $phuketRentHousePosts = createStore<PhuketRentHousePostsType>([]);

sample({
  clock: previousPostsTriggered,
  fn: () => {
    const previousPosts = localStorage.getItem('phuketRentHousePosts');

    if (previousPosts) {
      return JSON.parse(previousPosts) as PhuketRentHousePostsType;
    }

    return [];
  },
  target: [$nonFiltersPosts, $phuketRentHousePosts],
});

sample({
  clock: phuketRentHouseReceived.map(({ posts }) => posts),
  target: [$nonFiltersPosts, $phuketRentHousePosts],
});

export const $phuketRentHouseTotalBooleanOptions = restore(
  phuketRentHouseReceived.map(({ totalBooleanOptions }) => totalBooleanOptions),
  [],
);

export const filtersPhuketRentHouseCleared = createEvent<unknown>();

export const filterTotalBooleanOptionsSubmitted = createEvent();
export const filterTotalBooleanOptionsSelected =
  createEvent<PhuketRentHouseType['totalBooleanOptions']>();
export const $checkedTotalBooleanOptions = restore(
  filterTotalBooleanOptionsSelected,
  [],
).reset(filtersPhuketRentHouseCleared);

sample({
  source: [$checkedTotalBooleanOptions, $nonFiltersPosts],
  clock: filterTotalBooleanOptionsSubmitted,
  fn: ([checkedBooleanOptions, posts]) =>
    posts.filter((post) => {
      let postBooleanOptions: string[] = [];

      if (post.basicInfoFirst) {
        postBooleanOptions = [
          ...postBooleanOptions,
          ...post.basicInfoFirst.booleanOptions.map(
            (option) => option.description,
          ),
        ];
      }

      if (post.basicInfoLast) {
        postBooleanOptions = [
          ...postBooleanOptions,
          ...post.basicInfoLast.booleanOptions.map(
            (option) => option.description,
          ),
        ];
      }

      const isSomeOptionFounded = postBooleanOptions.some((option) =>
        checkedBooleanOptions.includes(option),
      );

      return isSomeOptionFounded;
    }),
  target: $phuketRentHousePosts,
});

forward({
  from: [filterTotalBooleanOptionsSubmitted, filtersPhuketRentHouseCleared],
  to: scrolledToLastViewPostCleared,
});

sample({
  source: $nonFiltersPosts,
  clock: filtersPhuketRentHouseCleared,
  target: $phuketRentHousePosts,
});
