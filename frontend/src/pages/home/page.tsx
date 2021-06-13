import React, { useEffect } from "react";

import { GroupSettings } from "../../features/group_settings/feature";
import { Posts } from "../../features/posts/feature";
import { getGroupsFx } from "../../models/groups/model";
import { AddGroupSettings } from "../../features/add_group_settings/feature";
import { GetPosts } from "../../features/get_posts/feature";

export const HomePage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <GroupSettings />
      <AddGroupSettings />
      <GetPosts />
      <Posts />
    </>
  );
};
