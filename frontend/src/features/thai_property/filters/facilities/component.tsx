import { useStore } from 'effector-react';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';
import {
  $checkedTotalFacilities,
  $thaiPropertyFacilities,
  filterTotalFacilitiesSelected,
  filterTotalFacilitiesSubmitted,
} from 'models/thai_property/model';
import React from 'react';

export const Facilities = () => {
  const totalFacilities = useStore($thaiPropertyFacilities);
  const checkedTotalFacilities = useStore($checkedTotalFacilities);

  return (
    <ModalSelectFilters
      titles={totalFacilities}
      checkedGroups={checkedTotalFacilities}
      onChangeCallback={filterTotalFacilitiesSelected}
      submitCallback={filterTotalFacilitiesSubmitted}
      title="Selected facilities"
      mobileTitle="Facilities"
    />
  );
};
