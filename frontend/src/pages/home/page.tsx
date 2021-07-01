import React, { useEffect } from 'react';
import { Divider } from 'antd';

import { getGroupsFx } from 'models/groups/model';
import { PostsFilters } from 'features/posts_filters/feature';
import { GroupSettings } from 'features/group_settings/feature';
import { Posts } from 'features/posts/feature';

export const HomePage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <GroupSettings />
      <Divider />
      <PostsFilters />
      <Posts />
    </>
  );
};
