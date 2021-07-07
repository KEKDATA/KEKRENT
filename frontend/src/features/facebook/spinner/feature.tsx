import { Row, Spin } from 'antd';
import { useStore } from 'effector-react';
import {
  $somePartOfPostsLoaded,
  getPostsFx,
} from 'models/facebook/posts/model';
import React from 'react';

export const Spinner = () => {
  const isLoading = useStore(getPostsFx.pending);
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  const isTotallySomePostsLoading = isLoading && !somePartOfPostsLoaded;

  if (!isTotallySomePostsLoading) {
    return null;
  }

  return (
    <Row justify="center" style={{ width: '100%' }}>
      <Spin size="large" tip="Loading" />
    </Row>
  );
};
