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
import {
  checkIsSomeFeatureFounded,
  getResultPetsFilter,
} from 'models/fazwaz/utils';
import { withPersist } from 'models/persist/model';
import { scrolledToLastViewPostCleared } from 'models/scroll_to_last_viewed_post/model';
import { condition } from 'patronum';
import { PetsFilter } from 'typings/pets';

export const FazwazGate = createGate();

const prependRequest = createEvent();
const previousFazwazPostsTriggered = createEvent();

export const getFazwazFx = createEffect(getFazwazApi);

forward({
  from: getFazwazFx.fail,
  to: previousFazwazPostsTriggered,
});

guard({
  source: getFazwazFx.pending,
  clock: FazwazGate.open,
  filter: (isLoading) => !isLoading,
  target: prependRequest,
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

const $nonFiltersFazwazPosts = withPersist(
  createStore<FazwazsType['posts']>([]),
  {
    key: 'fazwazPosts',
  },
);

export const $fazwazPosts = createStore<FazwazsType['posts']>([]);

sample({
  clock: previousFazwazPostsTriggered,
  fn: () => {
    const previousPosts = localStorage.getItem('fazwazPosts');

    if (previousPosts) {
      return JSON.parse(previousPosts) as FazwazsType['posts'];
    }

    return [];
  },
  target: [$nonFiltersFazwazPosts, $fazwazPosts],
});

sample({
  clock: fazwazReceived.map((fazwaz) => fazwaz.posts),
  target: [$nonFiltersFazwazPosts, $fazwazPosts],
});

export const $fazwazTotalFeatures = restore(
  fazwazReceived.map((fazwaz) => fazwaz.totalFeatures),
  [],
).on(previousFazwazPostsTriggered, (prevFeatures) => {
  if (prevFeatures.length > 0) {
    return prevFeatures;
  }

  const previousPosts = localStorage.getItem('fazwazPosts');

  if (previousPosts) {
    const parsedPosts = JSON.parse(previousPosts) as FazwazsType['posts'];

    const previousFeaturesBySavedPosts: Set<string> = new Set();

    parsedPosts.forEach((post) => {
      post.features.forEach((feature) =>
        previousFeaturesBySavedPosts.add(feature.text),
      );
    });

    return [...previousFeaturesBySavedPosts];
  }

  return [];
});

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
  source: [$checkedFeatures, $nonFiltersFazwazPosts, $petsFilter],
  clock: filterFazwazFeaturesSubmitted,
  fn: ([checkedFeatures, posts, petsFilter]) =>
    posts.filter(({ features, petsInfo }) => {
      const isSomeFeatureFounded = checkIsSomeFeatureFounded({
        features,
        checkedFeatures,
      });

      if (petsFilter && isSomeFeatureFounded) {
        return getResultPetsFilter({
          petsInfo,
          petsFilter,
          isSomeFeatureFounded,
        });
      }

      return isSomeFeatureFounded;
    }),
  target: $fazwazPosts,
});

sample({
  source: [$checkedFeatures, $nonFiltersFazwazPosts],
  clock: $petsFilter,
  fn: ([checkedFeatures, posts], petsFilter) =>
    posts.filter(({ features, petsInfo }) => {
      const isCheckedFeatures = checkedFeatures.length > 0;

      let isSomeFeatureFounded = true;

      if (isCheckedFeatures) {
        isSomeFeatureFounded = checkIsSomeFeatureFounded({
          features,
          checkedFeatures,
        });
      }

      if (petsFilter) {
        return getResultPetsFilter({
          petsInfo,
          petsFilter,
          isSomeFeatureFounded,
        });
      }

      return isSomeFeatureFounded;
    }),
  target: $fazwazPosts,
});

forward({
  from: [petsFilterToggled, filterFazwazFeaturesSubmitted, filterFazwazCleared],
  to: scrolledToLastViewPostCleared,
});

sample({
  source: $nonFiltersFazwazPosts,
  clock: filterFazwazCleared,
  target: $fazwazPosts,
});
