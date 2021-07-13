import { useStore } from 'effector-react';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';
import {
  $checkedTotalBooleanOptions,
  $phuketRentHouseTotalBooleanOptions,
  filterTotalBooleanOptionsSelected,
  filterTotalBooleanOptionsSubmitted,
} from 'models/phuket_rent_house/model';
import React from 'react';

export const BooleanOptions = () => {
  const booleanOptions = useStore($phuketRentHouseTotalBooleanOptions);
  const checkedBooleanOptions = useStore($checkedTotalBooleanOptions);

  return (
    <ModalSelectFilters
      titles={booleanOptions}
      checkedGroups={checkedBooleanOptions}
      onChangeCallback={filterTotalBooleanOptionsSelected}
      submitCallback={filterTotalBooleanOptionsSubmitted}
      title="Select features"
      mobileTitle="Features"
    />
  );
};
