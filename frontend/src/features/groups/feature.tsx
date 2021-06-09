import React, { useEffect } from "react";
import { Select } from "antd";
import { groupsIdsSelected } from "../../models/posts/model";
import { $groups, getGroupsFx } from "../../models/groups/model";
import { useStore } from "effector-react";

const { Option } = Select;

export const Groups = () => {
  const groups = useStore($groups);

  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select groups"
      onChange={groupsIdsSelected}
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
