import React, { useEffect } from 'react';
import { Divider } from 'antd';

import { getGroupsFx } from 'models/groups/model';
import { FacebookPostsFilters } from 'features/facebook/posts_filters/feature';
import { FacebookGroupSettings } from 'features/facebook/group_settings/feature';
import { FacebookPosts } from 'features/facebook/posts/feature';

export const FacebookPage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <FacebookGroupSettings />
      <Divider />
      <FacebookPostsFilters />
      <FacebookPosts />
    </>
  );
};
