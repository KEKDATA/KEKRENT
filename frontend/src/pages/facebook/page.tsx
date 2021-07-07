import { Divider } from 'antd';
import { FacebookGroupSettings } from 'features/facebook/group_settings/feature';
import { FacebookPosts } from 'features/facebook/posts/feature';
import { FacebookPostsFilters } from 'features/facebook/posts_filters/feature';
import { Spinner } from 'features/facebook/spinner/feature';
import { getGroupsFx } from 'models/facebook/groups/model';
import React, { useEffect } from 'react';

export const FacebookPage = () => {
  useEffect(() => {
    getGroupsFx();
  }, []);

  return (
    <>
      <FacebookGroupSettings />
      <Divider />
      <FacebookPostsFilters />
      <Spinner />
      <FacebookPosts />
    </>
  );
};
