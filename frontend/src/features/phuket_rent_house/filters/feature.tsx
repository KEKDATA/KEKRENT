import { ClearFilters } from 'features/clear_filters/feature';
import { BooleanOptions } from 'features/phuket_rent_house/filters/boolean_options/component';
import { filtersPhuketRentHouseCleared } from 'models/phuket_rent_house/model';
import React from 'react';
import { FiltersContainer } from 'ui/filters_container';

export const Filters = () => {
  return (
    <FiltersContainer>
      <BooleanOptions />
      <ClearFilters callback={filtersPhuketRentHouseCleared} />
    </FiltersContainer>
  );
};
