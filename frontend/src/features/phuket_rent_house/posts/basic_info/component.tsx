import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Typography, Row, Col } from 'antd';
import { PhuketRentHouseBasicInfoType } from 'contracts/phuket_rent_house/contract';
import React from 'react';

const { Text } = Typography;

const textStyle = css`
  font-size: 15px;
`;

const iconStyle = css`
  font-size: 24px;
  color: #08c !important;
`;

export const BasicInfo = ({
  numberOptions,
  booleanOptions,
}: {
  numberOptions: PhuketRentHouseBasicInfoType['numberOptions'];
  booleanOptions: PhuketRentHouseBasicInfoType['booleanOptions'];
}) => {
  return (
    <Row gutter={[16, 8]} justify="space-around">
      {numberOptions.map((numberOption) => (
        <Col key={numberOption.description} span={22}>
          <Row justify="space-between">
            <Text className={textStyle}>{numberOption.description}</Text>
            <Text className={textStyle}>{numberOption.count}</Text>
          </Row>
        </Col>
      ))}
      {booleanOptions.map((booleanOption) => (
        <Col key={booleanOption.description} span={22}>
          <Row justify="space-between">
            <Text className={textStyle}>{booleanOption.description}</Text>
            {booleanOption.isChecked && (
              <CheckSquareOutlined className={iconStyle} />
            )}
            {!booleanOption.isChecked && (
              <CloseSquareOutlined className={iconStyle} />
            )}
          </Row>
        </Col>
      ))}
    </Row>
  );
};
