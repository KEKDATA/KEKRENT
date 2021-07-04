import React from 'react';
import { Space } from 'antd';
import { css } from '@emotion/css';
import { filterFazwazCleared } from 'models/fazwaz/model';
import { ClearFilters } from 'features/clear_filters/feature';
import { Pets } from 'features/fazwaz/filters/Pets';
import { Features } from 'features/fazwaz/filters/Features';

const filtersStyle = css`
  margin: 10px 20px 5px 20px;
`;

export const Filters = () => {
  return (
    <div className={filtersStyle}>
      <Space size={[8, 16]}>
        <Pets />
        <Features />
        <ClearFilters callback={filterFazwazCleared} />
      </Space>
    </div>
  );
};
