import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { groupSettingsEvents } from 'models/facebook/group_settings/model';
import React from 'react';

export const AddGroupSettings = () => {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<PlusCircleOutlined />}
      onClick={groupSettingsEvents.addGroup}
    />
  );
};
