import React from 'react';
import { Select } from 'antd';

import { useStore } from 'effector-react';
import { css } from '@emotion/css';
import { $groups } from 'models/facebook/groups/model';
import {
  $selectedGroupsIds,
  groupSettingsEvents,
} from 'models/facebook/group_settings/model';

const { Option } = Select;

const style = css`
  width: 100%;
`;

export const SelectGroup = ({
  id,
  selectedGroupId,
}: {
  id: string;
  selectedGroupId: string | undefined;
}) => {
  const groups = useStore($groups);
  const selectedGroupsIds = useStore($selectedGroupsIds);

  const handleChange = (value: string) =>
    groupSettingsEvents.groupIdChanged({ id, selectedGroupId: value });

  return (
    <Select
      className={style}
      value={selectedGroupId}
      allowClear
      showSearch
      placeholder="Select a group"
      onChange={handleChange}
    >
      {groups.map((group) => (
        <Option
          value={group.id}
          key={group.id}
          disabled={Boolean(
            selectedGroupsIds.find(
              (id) => group.id === id && selectedGroupId !== id,
            ),
          )}
        >
          <div>Name: {group.title}</div>
          <div>Group size: {group.size}</div>
          <div>Posts per day: {group.posts}</div>
        </Option>
      ))}
    </Select>
  );
};
