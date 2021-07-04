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
import { getFazwazApi } from 'api/fazwaz';
import { FazwazContract, FazwazsType } from 'contracts/fazwaz/contract';
import { PetsFilter } from 'typings/pets';

export const FazwazGate = createGate();

export const getFazwazFx = createEffect(getFazwazApi);

forward({
  from: FazwazGate.open,
  to: getFazwazFx,
});

export const fazwazReceived = guard<unknown, FazwazsType>(
  getFazwazFx.doneData,
  {
    filter: FazwazContract.guard,
  },
);

export const $fazwaz = restore(fazwazReceived, []);
const $nonFiltersFazwaz = restore(fazwazReceived, []);

export const filterFazwazCleared = createEvent<unknown>();
export const petsFilterToggled = createEvent<unknown>();
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

sample({
  source: $nonFiltersFazwaz,
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
  target: $fazwaz,
});
