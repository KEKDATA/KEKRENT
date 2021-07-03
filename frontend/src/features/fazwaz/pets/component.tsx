import React from 'react';
import { Tooltip } from 'antd';
import { css } from '@emotion/css';
import { QuestionOutlined } from '@ant-design/icons';
import { FazwazType } from 'contracts/fazwaz/contract';
import { Icons } from 'assets/icons';

const containerStyle = css`
  width: max-content;

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

export const Pet = ({ petsInfo }: { petsInfo: FazwazType['petsInfo'] }) => {
  const { isAllowed, description, isNA } = petsInfo;

  return (
    <Tooltip title={description}>
      <div className={containerStyle} data-na-pet={isNA}>
        {isAllowed && <Icons.Pet width={38} height={38} />}
        {isNA && (
          <div>
            <QuestionOutlined className={questionStyle} />
            <Icons.Pet width={38} height={38} />
          </div>
        )}
        {!isAllowed && !isNA && <Icons.NoPet width={38} height={38} />}
      </div>
    </Tooltip>
  );
};
