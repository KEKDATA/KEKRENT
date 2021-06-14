import React from "react";
import { Button } from "antd";
import { getPostsFx } from "../../models/posts/model";
import { useStore } from "effector-react";
import { $groupsSettings } from "../../models/group_settings/model";
import { SearchOutlined } from "@ant-design/icons";

export const GetPosts = () => {
  const groupsSettings = useStore($groupsSettings);

  const handleClick = () => {
    groupsSettings.forEach((groupSettings) => getPostsFx(groupSettings));
  };

  return (
    <Button
      type="primary"
      shape="round"
      onClick={handleClick}
      icon={<SearchOutlined />}
    >
      Search
    </Button>
  );
};
