import { getFazwazApi } from 'api/fazwaz';
import { FazwazContract, FazwazsType } from 'contracts/fazwaz/contract';
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
import { condition } from 'patronum';
import { PetsFilter } from 'typings/pets';

export const FazwazGate = createGate();

const prependRequest = createEvent();
const previousFazwazPostsTriggered = createEvent();

export const getFazwazFx = createEffect(getFazwazApi);

forward({
  from: FazwazGate.open,
  to: prependRequest,
});

condition({
  source: prependRequest,
  if: () => Boolean(window.navigator.onLine),
  then: getFazwazFx,
  else: previousFazwazPostsTriggered,
});

export const fazwazReceived = guard<unknown, FazwazsType>(
  getFazwazFx.doneData,
  {
    filter: FazwazContract.guard,
  },
);

const oneHour = 3800000;
export const $fazwazPosts = withPersist(createStore<FazwazsType['posts']>([]), {
  expire: Date.now() + oneHour,
  key: 'fazwazPosts',
})
  .on(fazwazReceived, (_, fazwaz) => fazwaz.posts)
  .on(previousFazwazPostsTriggered, () => {
    const previousPosts = localStorage.getItem('fazwazPosts');

    if (previousPosts) {
      return JSON.parse(previousPosts) as FazwazsType['posts'];
    }

    return [];
  });

export const $fazwazTotalFeatures = restore(
  fazwazReceived.map((fazwaz) => fazwaz.totalFeatures),
  [],
);

const $nonFiltersFazwazPosts = restore(
  fazwazReceived.map((fazwaz) => fazwaz.posts),
  [],
);

export const filterFazwazCleared = createEvent<unknown>();
export const petsFilterToggled = createEvent<unknown>();
export const filterFazwazFeaturesSelected =
  createEvent<FazwazsType['totalFeatures']>();
export const filterFazwazFeaturesSubmitted = createEvent();

export const $petsFilter = createStore<PetsFilter | null>(null)
  .on(petsFilterToggled, (prev) => {
    switch (prev) {
      case PetsFilter.NotAllowed: {
        return PetsFilter.Allowed;
      }
      case PetsFilter.Allowed:
      default: {
        return PetsFilter.NotAllowed;
      }
    }
  })
  .reset(filterFazwazCleared);

export const $checkedFeatures = restore(filterFazwazFeaturesSelected, []).reset(
  filterFazwazCleared,
);

sample({
  source: [$checkedFeatures, $nonFiltersFazwazPosts],
  clock: filterFazwazFeaturesSubmitted,
  fn: ([checkedFeatures, posts]) =>
    posts.filter(({ features }) => {
      const normalizedFeatures = features.map(({ text }) => text);
      return checkedFeatures.some((checkedFeature) =>
        normalizedFeatures.includes(checkedFeature),
      );
    }),
  target: $fazwazPosts,
});

sample({
  source: $nonFiltersFazwazPosts,
  clock: $petsFilter,
  fn: (fazwazPosts, petsFilter) =>
    fazwazPosts.filter(({ petsInfo }) => {
      switch (petsFilter) {
        case PetsFilter.Allowed: {
          return petsInfo.isAllowed || petsInfo.isNA;
        }
        case PetsFilter.NotAllowed: {
          return !petsInfo.isAllowed && !petsInfo.isNA;
        }
        default: {
          return true;
        }
      }
    }),
  target: $fazwazPosts,
});

sample({
  source: $nonFiltersFazwazPosts,
  clock: filterFazwazCleared,
  target: $fazwazPosts,
});
