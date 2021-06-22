import { css } from '@emotion/css';
import { useStore } from 'effector-react';
import {
  $groupsSettings,
  groupSettingsEvents,
} from 'models/group_settings/model';
import { SelectGroup } from '../select_group/component';
import { Dates } from '../dates/component';
import { Price } from '../price/component';
import { NumberOfPosts } from '../number_of_posts/component';
import { Button, Typography, Row, Col, Space, Divider } from 'antd';
import React from 'react';

const groupsStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const deleteStyle = css`
  width: 100%;
  margin-top: 10px;
`;

export const Groups = () => {
  const groupsSettings = useStore($groupsSettings);

  if (!groupsSettings.length) {
    return <Typography> Empty settings :( </Typography>;
  }

  return (
    <>
      {groupsSettings.map(
        ({ id, price, numberOfPosts, selectedGroupId }, index) => (
          <>
            <Space
              direction="vertical"
              className={groupsStyle}
              key={id}
              size={12}
            >
              <SelectGroup id={id} selectedGroupId={selectedGroupId} />
              <Dates id={id} />
              <Row>
                <Col span={12}>
                  <Price id={id} min={price.min} max={price.max} />
                </Col>
                <Col span={12}>
                  <NumberOfPosts id={id} numberOfPosts={numberOfPosts} />
                </Col>
              </Row>
              <Button
                className={deleteStyle}
                type="primary"
                danger
                shape="round"
                onClick={() => {
                  groupSettingsEvents.removeSelectedGroup({ id });
                }}
              >
                Delete
              </Button>
            </Space>
            {index !== groupsSettings.length - 1 && <Divider />}
          </>
        ),
      )}
    </>
  );
};
