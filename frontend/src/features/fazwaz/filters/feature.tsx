import { ClearFilters } from 'features/clear_filters/feature';
import { Features } from 'features/fazwaz/filters/features/component';
import { Pets } from 'features/fazwaz/filters/pets/component';
import { filtersFazwazCleared } from 'models/fazwaz/model';
import React from 'react';
import { FiltersContainer } from 'ui/filters_container';

export const Filters = () => {
  return (
    <FiltersContainer>
      <Pets />
      <Features />
      <ClearFilters callback={filtersFazwazCleared} />
    </FiltersContainer>
  );
};
