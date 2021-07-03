import React from 'react';
import { Button } from 'antd';
import { useStore } from 'effector-react';
import { SearchOutlined } from '@ant-design/icons';
import { combine } from 'effector';
import {
  $groupsSettings,
  $selectedGroupsIds,
} from 'models/group_settings/model';
import { getPostsFx } from 'models/posts/model';
import { $groups } from 'models/groups/model';

const $normalizedSelectedGroups = combine(
  $selectedGroupsIds,
  $groups,
  (selectedGroupsIds, groups) => {
    const normalizedSelectedGroups: { title: string; id: string }[] = [];

    selectedGroupsIds.forEach((selectedId) => {
      const selectedGroup = groups.find(({ id }) => id === selectedId);

      if (selectedGroup) {
        normalizedSelectedGroups.push({
          title: selectedGroup.title,
          id: selectedGroup.id,
        });
      }
    });

    return normalizedSelectedGroups;
  },
);

export const GetPosts = () => {
  const groupsSettings = useStore($groupsSettings);
  const normalizedSelectedGroups = useStore($normalizedSelectedGroups);

  const handleClick = () => {
    groupsSettings.forEach((groupSettings) => {
      if (groupSettings.selectedGroupId) {
        const group = normalizedSelectedGroups.find(
          ({ id }) => id === groupSettings.selectedGroupId,
        );
        getPostsFx({
          timeStamps: groupSettings.timeStamps,
          numberOfPosts: groupSettings.numberOfPosts || 20,
          selectedGroupId: groupSettings.selectedGroupId,
          id: groupSettings.id,
          min: groupSettings.price.min,
          max: groupSettings.price.max,
          mode: groupSettings.mode,
          title: group?.title,
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
      disabled={normalizedSelectedGroups.length === 0}
    >
      Search
    </Button>
  );
};
