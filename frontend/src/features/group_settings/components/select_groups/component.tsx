import React from 'react';
import { Select } from 'antd';
import { useStore } from 'effector-react';
import { $groups } from '../../../../models/groups/model';
import {
  $selectedGroupsIds,
  groupSettingsEvents,
} from '../../../../models/group_settings/model';
import { css } from '@emotion/css';

const style = css`
  width: 100%;
`;

const { Option } = Select;

const handleAddGroup = (value: string) =>
  groupSettingsEvents.addSelectedGroup({ selectedGroupId: value });
const handleRemoveGroup = (value: string) =>
  groupSettingsEvents.removeSelectedGroup({ selectedGroupId: value });

export const SelectGroups = () => {
  const groups = useStore($groups);
  const selectedGroupsIds = useStore($selectedGroupsIds);

  return (
    <Select
      mode="multiple"
      placeholder="Please select"
      value={selectedGroupsIds}
      className={style}
      onSelect={handleAddGroup}
      onDeselect={handleRemoveGroup}
    >
      {groups.map((group) => (
        <Option key={group.id} value={group.id}>
          <div>{group.title}</div>
          <div>size: {group.size}</div>
          <div>posts: {group.posts}</div>
        </Option>
      ))}
    </Select>
  );
};
