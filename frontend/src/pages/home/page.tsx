import React, { useEffect } from "react";

import { GroupSettings } from "../../features/group_settings/feature";
import { Posts } from "../../features/posts/feature";
import { getGroupsFx } from "../../models/groups/model";
import { GetPosts } from "../../features/get_posts/feature";

export const HomePage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <GroupSettings />
      <GetPosts />
      <Posts />
    </>
  );
};
