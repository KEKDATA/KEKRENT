import React from 'react';

import { css } from '@emotion/css';
import { Row, Space } from 'antd';
import { SelectGroups } from './components/select_groups/component';
import { GetPosts } from './components/get_posts/component';
import { GroupsSettingsModal } from './components/groups_settings_modal/component';

const submitSettingsStyle = css`
  margin: 12px 0;
`;

const wrapperModalStyle = css`
  margin-left: 12px;
`;

export const GroupSettings = () => {
  return (
    <>
      <SelectGroups />
      <Row justify="center" align="middle" className={submitSettingsStyle}>
        <GetPosts />
        <Space size={[16, 0]} wrap className={wrapperModalStyle}>
          <GroupsSettingsModal />
        </Space>
      </Row>
    </>
  );
};
