import { useGate, useStore } from 'effector-react';
import { Filters } from 'features/fazwaz/filters/feature';
import { Posts } from 'features/fazwaz/posts/feature';
import { FazwazGate, getFazwazFx } from 'models/fazwaz/model';
import React from 'react';
import { Spinner } from 'ui/spinner';

export const FazwazPage = () => {
  useGate(FazwazGate);

  const isLoading = useStore(getFazwazFx.pending);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <Filters />
          <Posts />
        </>
      )}
    </>
  );
};
