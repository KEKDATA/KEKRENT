import { getThaiPropertyApi } from 'api/thai_property';
import {
  ThaiPropertyPostsContract,
  ThaiPropertyPostsType,
} from 'contracts/thai_property/contract';
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

export const thaiPropertyReceived = guard<unknown, ThaiPropertyPostsType>(
  getThaiPropertyFx.doneData,
  {
    filter: ThaiPropertyPostsContract.guard,
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
  clock: thaiPropertyReceived,
  target: [$nonFiltersPosts, $thaiPropertyPosts],
});
