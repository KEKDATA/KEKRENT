import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { groupSettingsEvents } from 'models/facebook/group_settings/model';

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
