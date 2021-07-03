import React from 'react';
import { useStore } from 'effector-react';

import { Divider, Row, Spin } from 'antd';
import { $posts, $somePartOfPostsLoaded, getPostsFx } from 'models/posts/model';
import { CardList } from 'ui/card/ui';
import { cardStyles } from 'ui/card/styles';
import { Post } from './components/post/component';

export const FacebookPosts = () => {
  const posts = useStore($posts);
  const isLoading = useStore(getPostsFx.pending);
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  const isTotallySomePostsLoading = isLoading && !somePartOfPostsLoaded;

  return (
    <CardList dataLoading={isTotallySomePostsLoading}>
      {isTotallySomePostsLoading && (
        <Row justify="center">
          <Spin size="large" tip="Loading" />
        </Row>
      )}
      {posts.map((post) => (
        <li key={post.id} className={cardStyles.post}>
          <Post post={post} />
          <Divider />
        </li>
      ))}
    </CardList>
  );
};
