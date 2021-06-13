import React, { useState } from "react";

import { NumberOfPosts } from "./components/number_of_posts/component";
import { Dates } from "./components/dates/component";
import { Price } from "./components/price/component";
import { SelectGroup } from "./components/select_group/feature";
import { css } from "@emotion/css";
import { useStore } from "effector-react";
import {
  $groupsSettings,
  groupSettingsEvents,
} from "../../models/group_settings/model";
import { Button, Modal } from "antd";
import { SelectGroups } from "./components/select_groups/component";
import { AddGroupSettings } from "./components/add_group_settings/component";

const styles = css`
  display: flex;
  flex-direction: column;
  max-width: 250px;
`;

const Groups = () => {
  const groupsSettings = useStore($groupsSettings);

  return (
    <>
      {groupsSettings.map(({ id, price, numberOfPosts, selectedGroupId }) => (
        <div className={styles} key={id}>
          <SelectGroup id={id} selectedGroupId={selectedGroupId} />
          <Dates id={id} />
          <Price id={id} min={price.min} max={price.max} />
          <NumberOfPosts id={id} numberOfPosts={numberOfPosts} />
          <Button
            type="primary"
            shape="round"
            disabled={!selectedGroupId}
            onClick={() => {
              if (selectedGroupId) {
                groupSettingsEvents.removeSelectedGroup({ selectedGroupId });
              }
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </>
  );
};

const GroupsSettingsModal = () => {
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
      <Button type="primary" shape="round" onClick={showModal}>
        Open groups settings
      </Button>
      <Modal
        title="Groups settings"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <AddGroupSettings />
        <Groups />
      </Modal>
    </>
  );
};

export const GroupSettings = () => {
  return (
    <>
      <SelectGroups />
      <GroupsSettingsModal />
    </>
  );
};
