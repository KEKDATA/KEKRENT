import React from 'react';
import { css } from '@emotion/css';
import { Typography } from 'antd';
import { FazwazType } from 'contracts/fazwaz/contract';

const { Text } = Typography;

const basicInformsStyle = css`
  list-style: none;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
`;

const basicInformStyle = css`
  width: 100px;
  margin-bottom: 4px;
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
