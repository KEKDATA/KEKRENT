import React from 'react';
import { useGate, useStore } from 'effector-react';
import { Row, Spin } from 'antd';
import { css } from '@emotion/css';
import { FazwazGate, getFazwazFx } from 'models/fazwaz/model';
import { Fazwaz } from 'features/fazwaz/feature';

const spinContainerStyles = css`
  margin: 10px;
`;

export const FazwazPage = () => {
  useGate(FazwazGate);

  const isLoading = useStore(getFazwazFx.pending);

  return (
    <>
      {isLoading && (
        <Row justify="center" className={spinContainerStyles}>
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {!isLoading && <Fazwaz />}
    </>
  );
};
