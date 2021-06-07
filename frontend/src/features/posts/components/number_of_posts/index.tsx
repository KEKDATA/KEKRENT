import React from "react";
import { useStore } from "effector-react";
import { Slider, InputNumber, Row, Col } from "antd";

import { $numberOfPosts, numberOfPostsChanged } from "../../model";

export const NumberOfPosts = () => {
  const numberOfPosts = useStore($numberOfPosts);

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={1}
          max={110}
          onChange={numberOfPostsChanged}
          value={numberOfPosts}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={1}
          max={110}
          style={{ margin: "0 16px" }}
          value={numberOfPosts}
          onChange={numberOfPostsChanged}
        />
      </Col>
    </Row>
  );
};
