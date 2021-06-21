import React from 'react';
import { useStore } from 'effector-react';

import { $posts } from 'models/posts/model';
import { css } from '@emotion/css';
import { Post } from './components/post/component';

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0 20px;
`;

export const Posts = () => {
  const posts = useStore($posts);

  return (
    <ul className={listStyle}>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </ul>
  );
};
