import { css } from '@emotion/css';
import { Space } from 'antd';
import { ClearFilters } from 'features/clear_filters/feature';
import { BooleanOptions } from 'features/phuket_rent_house/filters/boolean_options/component';
import { filtersPhuketRentHouseCleared } from 'models/phuket_rent_house/model';
import React from 'react';

const filtersStyle = css`
  margin: 10px 20px;
`;

export const Filters = () => {
  return (
    <div className={filtersStyle}>
      <Space size={[8, 16]}>
        <BooleanOptions />
        <ClearFilters callback={filtersPhuketRentHouseCleared} />
      </Space>
    </div>
  );
};
