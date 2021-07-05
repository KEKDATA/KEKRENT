import { Post } from './components/post/component';
import { Divider, Row, Spin } from 'antd';
import { useList, useStore } from 'effector-react';
import {
  $facebookPosts,
  $somePartOfPostsLoaded,
  getPostsFx,
} from 'models/facebook/posts/model';
import React from 'react';
import { cardStyles } from 'ui/card/styles';
import { CardList } from 'ui/card/ui';

export const FacebookPosts = () => {
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
      {useList($facebookPosts, (post) => (
        <li key={post.id} className={cardStyles.post}>
          <Post post={post} />
          <Divider />
        </li>
      ))}
    </CardList>
  );
};
