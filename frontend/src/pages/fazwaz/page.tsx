import React from 'react';
import { useGate, useStore } from 'effector-react';
import { Row, Spin } from 'antd';
import { FazwazGate, getFazwazFx } from 'models/fazwaz/model';
import { Fazwaz } from 'features/fazwaz/feature';

export const FazwazPage = () => {
  useGate(FazwazGate);

  const isLoading = useStore(getFazwazFx.pending);

  return (
    <>
      {isLoading && (
        <Row justify="center">
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {!isLoading && <Fazwaz />}
    </>
  );
};
