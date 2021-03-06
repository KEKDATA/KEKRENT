import { Dates } from '../dates/component';
import { Mode } from '../mode/component';
import { NumberOfPosts } from '../number_of_posts/component';
import { Price } from '../price/component';
import { SelectGroup } from '../select_group/component';
import { css } from '@emotion/css';
import { Button, Typography, Row, Col, Space, Divider } from 'antd';
import { useStore } from 'effector-react';
import {
  $groupsSettings,
  groupSettingsEvents,
} from 'models/facebook/group_settings/model';
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

  if (groupsSettings.length === 0) {
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
              <Mode id={id} />
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
