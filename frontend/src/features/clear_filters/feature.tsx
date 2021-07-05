import { ClearOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useStore } from 'effector-react';
import { $isMobileScreenType } from 'models/screen_type/model';
import React from 'react';

export const ClearFilters = ({ callback }: { callback: () => void }) => {
  const isMobile = useStore($isMobileScreenType);

  return (
    <Button
      type="primary"
      shape="round"
      onClick={callback}
      icon={<ClearOutlined />}
    >
      {!isMobile && 'Clear filters'}
    </Button>
  );
};
