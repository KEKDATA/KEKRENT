import { css } from '@emotion/css';
import { Space } from 'antd';
import { ClearFilters } from 'features/clear_filters/feature';
import { Features } from 'features/fazwaz/filters/features/component';
import { Pets } from 'features/fazwaz/filters/pets/component';
import { filterFazwazCleared } from 'models/fazwaz/model';
import React from 'react';

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
