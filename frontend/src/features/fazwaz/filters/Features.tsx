import React from 'react';
import { useStore } from 'effector-react';
import {
  $checkedFeatures,
  $fazwazTotalFeatures,
  filterFazwazFeaturesSelected,
  filterFazwazFeaturesSubmitted,
} from 'models/fazwaz/model';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';

export const Features = () => {
  const features = useStore($fazwazTotalFeatures);
  const checkedFeatures = useStore($checkedFeatures);

  return (
    <ModalSelectFilters
      checkedGroups={checkedFeatures}
      titles={features}
      submitCallback={filterFazwazFeaturesSubmitted}
      onChangeCallback={filterFazwazFeaturesSelected}
    />
  );
};
