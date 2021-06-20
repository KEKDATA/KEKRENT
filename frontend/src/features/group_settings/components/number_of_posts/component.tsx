import React from "react";
import { InputNumber, Row } from "antd";

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
    <Row>
      <InputNumber
        style={{ width: "100%" }}
        placeholder="Number of posts"
        value={numberOfPosts}
        min={1}
        max={110}
        onChange={handleChange}
      />
    </Row>
  );
};
