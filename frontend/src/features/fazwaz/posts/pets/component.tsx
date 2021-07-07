import { QuestionOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Tooltip } from 'antd';
import { Icons } from 'assets/icons';
import { FazwazType } from 'contracts/fazwaz/contract';
import React from 'react';

const containerStyle = css`
  width: max-content;
  margin-bottom: 6px;

  &[data-na-pet='true'] {
    position: relative;
    background-color: whitesmoke;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    text-align: center;
  }
`;

const questionStyle = css`
  position: absolute;
  width: 40px;
  height: 40px;

  svg {
    width: 36px !important;
    height: 36px !important;
    fill: white;
  }
`;

export const Pets = ({ petsInfo }: { petsInfo: FazwazType['petsInfo'] }) => {
  const { isAllowed, description, isNA } = petsInfo;

  return (
    <Tooltip title={description}>
      <div className={containerStyle} data-na-pet={isNA}>
        {isAllowed && <Icons.Pet width={38} height={38} fill="black" />}
        {isNA && (
          <div>
            <QuestionOutlined className={questionStyle} />
            <Icons.Pet width={38} height={38} fill="black" />
          </div>
        )}
        {!isAllowed && !isNA && <Icons.NoPet width={38} height={38} />}
      </div>
    </Tooltip>
  );
};
