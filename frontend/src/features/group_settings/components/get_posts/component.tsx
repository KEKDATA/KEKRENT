import React from 'react';
import { Button } from 'antd';
import { getPostsFx } from 'models/posts/model';
import { useStore } from 'effector-react';
import {
  $groupsSettings,
  $selectedGroupsIds,
} from 'models/group_settings/model';
import { SearchOutlined } from '@ant-design/icons';

export const GetPosts = () => {
  const groupsSettings = useStore($groupsSettings);
  const selectedGroupsIds = useStore($selectedGroupsIds);

  const handleClick = () => {
    groupsSettings.forEach((groupSettings) => {
      if (groupSettings.selectedGroupId) {
        getPostsFx({
          timeStamps: groupSettings.timeStamps,
          numberOfPosts: groupSettings.numberOfPosts || 20,
          selectedGroupId: groupSettings.selectedGroupId,
          id: groupSettings.id,
          min: groupSettings.price.min,
          max: groupSettings.price.max,
          mode: groupSettings.mode,
        });
      }
    });
  };

  return (
    <Button
      type="primary"
      shape="round"
      onClick={handleClick}
      icon={<SearchOutlined />}
      disabled={selectedGroupsIds.length === 0}
    >
      Search
    </Button>
  );
};
