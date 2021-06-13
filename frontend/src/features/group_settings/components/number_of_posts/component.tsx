import React from "react";
import { InputNumber } from "antd";

import { groupSettingsEvents } from "../../../../models/group_settings/model";

export const NumberOfPosts = ({
  id,
  numberOfPosts,
}: {
  id: string;
  numberOfPosts: number;
}) => {
  const handleChange = (numberOfPosts: number) => {
    groupSettingsEvents.numberOfPostsChanged({ id, numberOfPosts });
  };

  return (
    <div>
      <InputNumber
        placeholder="How much posts from group"
        value={numberOfPosts}
        min={1}
        max={110}
        onChange={handleChange}
      />
    </div>
  );
};
