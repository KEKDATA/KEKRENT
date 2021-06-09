import { Button } from "antd";
import { getPosts } from "../../../../models/posts/model";
import React from "react";

export const Submit = () => {
  return (
    <Button type="primary" shape="round" onClick={getPosts}>
      GET POSTS
    </Button>
  );
};
