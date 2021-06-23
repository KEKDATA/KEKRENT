import React from 'react';
import { BackTop } from 'antd';
import { css } from '@emotion/css';
import { UpOutlined } from '@ant-design/icons';

const backTopButtonStyle = css`
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14px;
`;

const backTopStyle = css`
  right: 20px !important;
  bottom: 20px !important;
`;

export const BackToTop = () => (
  <BackTop className={backTopStyle}>
    <div className={backTopButtonStyle}>
      <UpOutlined />
    </div>
  </BackTop>
);
