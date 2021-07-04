import React from 'react';
import { useStore } from 'effector-react';
import {
  $checkedGroups,
  $submittedGroups,
  filterPostsByCheckedGroupsSelected,
  filterPostsByCheckedGroupsSubmitted,
} from 'models/facebook/posts_filters/model';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';

export const PostsBySelectedGroups = () => {
  const groupsTitles = useStore($submittedGroups);
  const checkedGroups = useStore($checkedGroups);

  return (
    <ModalSelectFilters
      checkedGroups={checkedGroups}
      titles={groupsTitles}
      submitCallback={filterPostsByCheckedGroupsSubmitted}
      onChangeCallback={filterPostsByCheckedGroupsSelected}
    />
  );
};
