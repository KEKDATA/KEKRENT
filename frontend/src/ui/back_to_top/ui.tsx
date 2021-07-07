import { UpOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { BackTop } from 'antd';
import React from 'react';

const backToTopButtonStyle = css`
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 4px;
  background-color: #1088e9;
  color: #fff;
  text-align: center;
  font-size: 14px;
`;

const backToTopStyle = css`
  right: 20px !important;
  bottom: 20px !important;
`;

export const BackToTop = () => (
  <BackTop className={backToTopStyle}>
    <div className={backToTopButtonStyle}>
      <UpOutlined />
    </div>
  </BackTop>
);
