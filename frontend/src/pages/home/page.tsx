import React from "react";

import { Posts } from "../../features/posts/feature";
import { Groups } from "../../features/groups/feature";
import { Col, Row } from "antd";

export const HomePage = () => {
  return (
    <Row justify="center">
      <Col span={24}>
        <Groups />
      </Col>
      <Col>
        <Posts />
      </Col>
    </Row>
  );
};
