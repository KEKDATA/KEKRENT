import React from 'react';
import { useStore } from 'effector-react';

import { $posts, $somePartOfPostsLoaded, getPostsFx } from 'models/posts/model';
import { css } from '@emotion/css';
import { Divider, Row, Spin } from 'antd';
import { Post } from './components/post/component';

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &[data-loading='true'] {
    display: block;
  }
`;

const postStyle = css`
  @media screen and (min-width: 768px) {
    max-width: 49%;
  }
`;

export const Posts = () => {
  const posts = useStore($posts);
  const isLoading = useStore(getPostsFx.pending);
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  const isTotallySomePostsLoading = isLoading && !somePartOfPostsLoaded;

  return (
    <ul className={listStyle} data-loading={isTotallySomePostsLoading}>
      {isTotallySomePostsLoading && (
        <Row justify="center">
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {posts.map((post) => (
        <li key={post.id} className={postStyle}>
          <Post post={post} />
          <Divider />
        </li>
      ))}
    </ul>
  );
};
