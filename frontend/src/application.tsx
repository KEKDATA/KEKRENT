import * as React from 'react';
import { Layout, Row, Space, Typography, BackTop } from 'antd';
import { css } from '@emotion/css';

import { Pages } from './pages';

import './application.css';
import { UpOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const style = css`
  height: 100%;
`;

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

export const Application = () => (
  <Layout className={style}>
    <Header>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Title style={{ marginBottom: 0, color: 'white' }}>KEKRENT</Title>
      </Row>
    </Header>
    <Content>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <Pages />
      </Space>
    </Content>
    <Footer />
    <BackTop className={backTopStyle}>
      <div className={backTopButtonStyle}>
        <UpOutlined />
      </div>
    </BackTop>
  </Layout>
);
