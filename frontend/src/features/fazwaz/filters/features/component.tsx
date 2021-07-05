import { useStore } from 'effector-react';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';
import {
  $checkedFeatures,
  $fazwazTotalFeatures,
  filterFazwazFeaturesSelected,
  filterFazwazFeaturesSubmitted,
} from 'models/fazwaz/model';
import React from 'react';

export const Features = () => {
  const features = useStore($fazwazTotalFeatures);
  const checkedFeatures = useStore($checkedFeatures);

  return (
    <ModalSelectFilters
      mobileTitle="Features"
      title="Select features"
      checkedGroups={checkedFeatures}
      titles={features}
      submitCallback={filterFazwazFeaturesSubmitted}
      onChangeCallback={filterFazwazFeaturesSelected}
    />
  );
};
