import { css } from '@emotion/css';
import { Row, Spin } from 'antd';
import { useGate, useStore } from 'effector-react';
import { Filters } from 'features/fazwaz/filters/feature';
import { Posts } from 'features/fazwaz/posts/feature';
import { FazwazGate, getFazwazFx } from 'models/fazwaz/model';
import React from 'react';

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
      {!isLoading && (
        <>
          <Filters />
          <Posts />
        </>
      )}
    </>
  );
};
