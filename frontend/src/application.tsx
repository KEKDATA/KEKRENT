import * as React from 'react';
import { Layout, Row, Space, Typography, BackTop } from 'antd';
import { css } from '@emotion/css';

import { Pages } from 'pages';
import { BackToTop } from 'ui/back_to_top/ui';

import './application.css';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const style = css`
  height: 100%;
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
    <BackToTop />
  </Layout>
);
