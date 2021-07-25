import { css } from '@emotion/css';
import { Row, Spin } from 'antd';
import React from 'react';

const spinContainerStyles = css`
  margin: 10px;
`;

export const Spinner = () => (
  <Row justify="center" className={spinContainerStyles}>
    <Spin size="large" tip="Loading" />
  </Row>
);
