import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { Button, Modal, Checkbox, Divider } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FacebookOutlined } from '@ant-design/icons';
import {
  $checkedGroups,
  $submittedGroups,
  filterPostsByCheckedGroupsSelected,
  filterPostsByCheckedGroupsSubmitted,
} from 'models/facebook/posts_filters/model';
import { $isMobileScreenType } from 'models/screen_type/model';

const CheckboxGroup = Checkbox.Group;

export const PostsBySelectedGroups = () => {
  const isMobile = useStore($isMobileScreenType);
  const groupsTitles = useStore($submittedGroups);
  const checkedGroups = useStore($checkedGroups);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    filterPostsByCheckedGroupsSelected(list as string[]);
    setIndeterminate(list.length > 0 && list.length < groupsTitles.length);
    setCheckAll(list.length === groupsTitles.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    filterPostsByCheckedGroupsSelected(e.target.checked ? groupsTitles : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    filterPostsByCheckedGroupsSubmitted();
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={showModal}>
        {isMobile && <FacebookOutlined />}
        {!isMobile && 'Select groups'}
      </Button>
      <Modal
        title="Select groups"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleClose}
        footer={[
          <Button key="submit" type="primary" shape="round" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <Divider />
        <CheckboxGroup
          options={groupsTitles}
          value={checkedGroups}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};
