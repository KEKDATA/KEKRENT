import React from "react";
import { Select } from "antd";
import { groupsIdsSelected } from "../../model";

const { Option } = Select;

const groups = [126101298046115, 796291153803529];

export const Groups = () => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: "100%" }}
      placeholder="Please select groups"
      onChange={groupsIdsSelected}
    >
      {groups.map((group) => (
        <Option value={group} key={group}>
          {group}
        </Option>
      ))}
    </Select>
  );
};
