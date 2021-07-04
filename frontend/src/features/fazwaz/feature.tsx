import React from 'react';
import { Posts } from 'features/fazwaz/posts/component';
import { Filters } from 'features/fazwaz/filters/component';

export const Fazwaz = () => {
  return (
    <>
      <Filters />
      <Posts />
    </>
  );
};
