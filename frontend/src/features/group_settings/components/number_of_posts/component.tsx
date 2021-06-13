import React from "react";
import { useStoreMap } from "effector-react";
import { InputNumber } from "antd";

import {
  $groupsSettings,
  groupSettingsEvents,
} from "../../../../models/group_settings/model";

export const NumberOfPosts = ({ id }: { id: string }) => {
  const numberOfPosts = useStoreMap({
    store: $groupsSettings,
    keys: [id],
    fn: (groupsSettings) =>
      groupsSettings.find((groupSettings) => groupSettings.id === id)!
        .numberOfPosts,
  });

  const handleChange = (numberOfPosts: number) => {
    groupSettingsEvents.numberOfPostsChanged({ id, numberOfPosts });
  };

  return (
    <div>
      <InputNumber
        placeholder="How much posts from group"
        value={numberOfPosts}
        min={5}
        max={110}
        onChange={handleChange}
      />
    </div>
  );
};
