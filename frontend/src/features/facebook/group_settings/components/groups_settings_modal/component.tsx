import { AddGroupSettings } from '../add_group_settings/component';
import { Groups } from '../groups/component';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';

export const GroupsSettingsModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        onClick={showModal}
        icon={<SettingOutlined />}
      />
      <Modal
        title="Groups settings"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <AddGroupSettings key="settings" />,
          <Button key="submit" type="primary" shape="round" onClick={handleOk}>
            SUBMIT
          </Button>,
        ]}
      >
        <Groups />
      </Modal>
    </>
  );
};
