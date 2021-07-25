import { css } from '@emotion/css';
import { Space } from 'antd';
import React, { FC } from 'react';

const filtersStyle = css`
  margin: 10px 20px;
`;

export const FiltersContainer: FC = ({ children }) => (
  <div className={filtersStyle}>
    <Space size={[8, 16]}>{children}</Space>
  </div>
);
