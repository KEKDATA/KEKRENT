import React from "react";
import { Select } from "antd";
import { $groups } from "../../../../models/groups/model";
import { useStore } from "effector-react";
import { css } from "@emotion/css";
import { groupSettingsEvents } from "../../../../models/group_settings/model";

const { Option } = Select;

const styles = css`
  max-width: 250px;
`;

export const SelectGroup = ({
  id,
  selectedGroupId,
}: {
  id: string;
  selectedGroupId: string | undefined;
}) => {
  const groups = useStore($groups);

  const handleChange = (value: string) =>
    groupSettingsEvents.groupIdChanged({ id, selectedGroupId: value });

  return (
    <Select
      className={styles}
      value={selectedGroupId}
      allowClear
      showSearch
      style={{ width: 250 }}
      placeholder="Select a group"
      onChange={handleChange}
    >
      {groups.map((group) => (
        <Option value={group.id} key={group.id}>
          <div>
            <div>Name: {group.title}</div>
            <div>Group size: {group.size}</div>
            <div>Posts per day: {group.posts}</div>
          </div>
        </Option>
      ))}
    </Select>
  );
};
