import { css } from '@emotion/css';
import { Typography } from 'antd';
import { FazwazType } from 'contracts/fazwaz/contract';
import React from 'react';

const { Text } = Typography;

const basicInformsStyle = css`
  list-style: none;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const basicInformStyle = css`
  width: 140px;
  margin-bottom: 4px;
  margin-right: 12px;
`;

export const BasicInforms = ({
  basicInforms,
}: {
  basicInforms: FazwazType['basicInforms'];
}) => {
  return (
    <ul className={basicInformsStyle}>
      {basicInforms.map((basicInfo) => (
        <li className={basicInformStyle} key={basicInfo.topic}>
          <Text strong>{basicInfo.topic}</Text>
          <Typography>{basicInfo.info}</Typography>
        </li>
      ))}
    </ul>
  );
};
