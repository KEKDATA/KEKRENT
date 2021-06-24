import React, { useEffect } from 'react';
import { Divider } from 'antd';

import { GroupSettings } from 'features/group_settings/feature';
import { Posts } from 'features/posts/feature';
import { getGroupsFx } from 'models/groups/model';
import { PostsFilters } from 'features/posts_filters/feature';

export const HomePage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <GroupSettings />
      <PostsFilters />
      <Divider />
      <Posts />
    </>
  );
};
