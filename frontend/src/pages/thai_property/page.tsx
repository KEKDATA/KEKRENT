import { useGate, useStore } from 'effector-react';
import { Posts } from 'features/thai_property/posts/feature';
import {
  getThaiPropertyFx,
  ThaiPropertyGate,
} from 'models/thai_property/model';
import React from 'react';
import { Spinner } from 'ui/spinner';

export const ThaiPropertyPage = () => {
  useGate(ThaiPropertyGate);

  const isLoading = useStore(getThaiPropertyFx.pending);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <Posts />
        </>
      )}
    </>
  );
};
