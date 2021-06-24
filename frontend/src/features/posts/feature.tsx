import React, { Fragment } from 'react';
import { useStore } from 'effector-react';

import { $posts, $somePartOfPostsLoaded, getPostsFx } from 'models/posts/model';
import { css } from '@emotion/css';
import { Divider, Row, Spin } from 'antd';
import { Post } from './components/post/component';

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0 20px;
`;

export const Posts = () => {
  const posts = useStore($posts);
  const isLoading = useStore(getPostsFx.pending);
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  return (
    <ul className={listStyle}>
      {isLoading && !somePartOfPostsLoaded && (
        <Row justify="center">
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {posts.map((post) => (
        <Fragment key={post.id}>
          <Post post={post} />
          <Divider />
        </Fragment>
      ))}
    </ul>
  );
};
