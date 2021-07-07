import { Post } from './components/post/component';
import { Divider } from 'antd';
import { useStore } from 'effector-react';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $facebookPosts } from 'models/facebook/posts/model';
import React from 'react';
import { cardStyles } from 'ui/card/styles';
import { CardList } from 'ui/card/ui';

export const FacebookPosts = () => {
  const facebookPosts = useStore($facebookPosts);

  const viewedPosts = useViewedPosts({
    posts: facebookPosts,
    postsOnInitialView: 20,
  });

  return (
    <CardList>
      {viewedPosts.map((post) => (
        <li key={post.id} className={cardStyles.post}>
          <Post post={post} />
          <Divider />
        </li>
      ))}
    </CardList>
  );
};
