import './application.css';
import { Pages } from './pages';
import { css } from '@emotion/css';
import { Layout, Row, Space, Typography } from 'antd';
import 'antd/dist/antd.min.css';
import { useScreenType } from 'features/screen_type/feature';
import * as React from 'react';
import { BackToTop } from 'ui/back_to_top';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const style = css`
  height: 100%;
`;

export const Application = () => {
  useScreenType();

  return (
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
};
