import { getPhuketRentHouseApi } from 'api/phuket_rent_house';
import {
  PhuketRentHouseContract,
  PhuketRentHouseType,
} from 'contracts/phuket_rent_house/contract';
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
  sample,
} from 'effector';
import { createGate } from 'effector-react';
import { withPersist } from 'models/persist/model';
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

const $nonFiltersPosts = withPersist(createStore<PhuketRentHouseType>([]), {
  key: 'phuketRentHousePosts',
});

export const $phuketRentHousePosts = createStore<PhuketRentHouseType>([]);

sample({
  clock: previousPostsTriggered,
  fn: () => {
    const previousPosts = localStorage.getItem('phuketRentHousePosts');

    if (previousPosts) {
      return JSON.parse(previousPosts) as PhuketRentHouseType;
    }

    return [];
  },
  target: [$nonFiltersPosts, $phuketRentHousePosts],
});

sample({
  clock: phuketRentHouseReceived,
  target: [$nonFiltersPosts, $phuketRentHousePosts],
});
