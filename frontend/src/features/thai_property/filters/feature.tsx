import { ClearFilters } from 'features/clear_filters/feature';
import { Facilities } from 'features/thai_property/filters/facilities/component';
import { filtersThaiPropertyCleared } from 'models/thai_property/model';
import React from 'react';
import { FiltersContainer } from 'ui/filters_container';

export const Filters = () => {
  return (
    <FiltersContainer>
      <Facilities />
      <ClearFilters callback={filtersThaiPropertyCleared} />
    </FiltersContainer>
  );
};
