import * as React from "react";
import { Layout, Space } from "antd";

import { Pages } from "./pages";

import "./application.css";

const { Header, Footer, Content } = Layout;

export const Application = () => (
  <Layout>
    <Header />
    <Content>
      <Space direction="vertical" size={12}>
        <Pages />
      </Space>
    </Content>
    <Footer>Anywhere</Footer>
  </Layout>
);
