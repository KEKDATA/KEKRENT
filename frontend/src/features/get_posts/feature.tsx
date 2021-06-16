import React from "react";
import { Button } from "antd";
import { savePostsFx } from "../../models/posts/model";
import { useStore } from "effector-react";
import { $groupsSettings } from "../../models/group_settings/model";
import { SearchOutlined } from "@ant-design/icons";

export const GetPosts = () => {
  const groupsSettings = useStore($groupsSettings);

  const handleClick = () => {
    groupsSettings.forEach((groupSettings) =>
      savePostsFx({
        timeStamps: groupSettings.timeStamps,
        numberOfPosts: groupSettings.numberOfPosts,
        selectedGroupId: groupSettings.selectedGroupId,
        id: groupSettings.id,
        min: groupSettings.price.min,
        max: groupSettings.price.max,
      })
    );
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
