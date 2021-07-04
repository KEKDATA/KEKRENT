import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { Button, Modal, Checkbox, Divider } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { FacebookOutlined } from '@ant-design/icons';
import { $isMobileScreenType } from 'models/screen_type/model';

const CheckboxGroup = Checkbox.Group;

export const ModalSelectFilters = ({
  titles,
  mobileTitle,
  checkedGroups,
  onChangeCallback,
  submitCallback,
  title,
}: {
  titles: string[];
  checkedGroups: string[];
  onChangeCallback: (list: string[]) => void;
  submitCallback: () => void;
  title: string;
  mobileTitle: JSX.Element | string;
}) => {
  const isMobile = useStore($isMobileScreenType);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    onChangeCallback(list as string[]);
    setIndeterminate(list.length > 0 && list.length < titles.length);
    setCheckAll(list.length === titles.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    onChangeCallback(e.target.checked ? titles : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    submitCallback();
    setIsModalVisible(false);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" shape="round" onClick={showModal}>
        {isMobile && mobileTitle}
        {!isMobile && title}
      </Button>
      <Modal
        title={title}
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
          options={titles}
          value={checkedGroups}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};
