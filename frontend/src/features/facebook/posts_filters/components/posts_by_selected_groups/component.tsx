import { FacebookOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import { ModalSelectFilters } from 'features/modal_select_filters/feature';
import {
  $checkedGroups,
  $submittedGroups,
  filterPostsByCheckedGroupsSelected,
  filterPostsByCheckedGroupsSubmitted,
} from 'models/facebook/posts_filters/model';
import React from 'react';

export const PostsBySelectedGroups = () => {
  const groupsTitles = useStore($submittedGroups);
  const checkedGroups = useStore($checkedGroups);

  return (
    <ModalSelectFilters
      mobileTitle={<FacebookOutlined />}
      title="Select groups"
      checkedGroups={checkedGroups}
      titles={groupsTitles}
      submitCallback={filterPostsByCheckedGroupsSubmitted}
      onChangeCallback={filterPostsByCheckedGroupsSelected}
    />
  );
};
