import { useGate, useStore } from 'effector-react';
import { Filters } from 'features/phuket_rent_house/filters/feature';
import { Posts } from 'features/phuket_rent_house/posts/feature';
import {
  getPhuketRentHouseFx,
  PhuketRentHouseGate,
} from 'models/phuket_rent_house/model';
import React from 'react';
import { Spinner } from 'ui/spinner';

export const PhuketRentHousePage = () => {
  useGate(PhuketRentHouseGate);

  const isLoading = useStore(getPhuketRentHouseFx.pending);

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
