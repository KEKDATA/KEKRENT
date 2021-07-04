import { useStore } from 'effector-react';
import { Button } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import React from 'react';
import { $isMobileScreenType } from 'models/screen_type/model';

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
