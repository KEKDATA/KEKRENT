import { css } from '@emotion/css';
import { Row, Spin } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Filters } from 'features/phuket_rent_house/filters/feature';
import { Posts } from 'features/phuket_rent_house/posts/feature';
import {
  getPhuketRentHouseFx,
  PhuketRentHouseGate,
} from 'models/phuket_rent_house/model';
import React from 'react';

const spinContainerStyles = css`
  margin: 10px;
`;

export const PhuketRentHousePage = () => {
  useGate(PhuketRentHouseGate);

  const isLoading = useStore(getPhuketRentHouseFx.pending);

  return (
    <>
      {isLoading && (
        <Row justify="center" className={spinContainerStyles}>
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {!isLoading && (
        <>
          <Filters />
          <Posts />
        </>
      )}
    </>
  );
};
