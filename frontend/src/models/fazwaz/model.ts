import { createEffect, forward, guard, restore } from 'effector';
import { createGate } from 'effector-react';
import { getFazwazApi } from 'api/fazwaz';
import { FazwazContract, FazwazsType } from 'contracts/fazwaz/contract';

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
