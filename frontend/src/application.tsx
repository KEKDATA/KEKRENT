import * as React from "react";
import { Layout, Row, Space, Typography } from "antd";

import { Pages } from "./pages";

import "./application.css";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

export const Application = () => (
  <Layout>
    <Header>
      <Row justify="center" align="middle" style={{ height: "100%" }}>
        <Title style={{ marginBottom: 0, color: "white" }}>KEKRENT</Title>
      </Row>
    </Header>
    <Content>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Pages />
      </Space>
    </Content>
    <Footer>Anywhere</Footer>
  </Layout>
);
