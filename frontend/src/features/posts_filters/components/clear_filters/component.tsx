import { useStore } from 'effector-react';
import { $isMobileScreenType } from 'models/screen_type/model';
import { Button } from 'antd';
import { filterPostsCleared } from 'models/posts_filters/model';
import { ClearOutlined } from '@ant-design/icons';
import React from 'react';

export const ClearFilters = () => {
  const isMobile = useStore($isMobileScreenType);

  return (
    <Button
      type="primary"
      shape="round"
      onClick={filterPostsCleared}
      icon={<ClearOutlined />}
    >
      {!isMobile && 'Clear filters'}
    </Button>
  );
};
