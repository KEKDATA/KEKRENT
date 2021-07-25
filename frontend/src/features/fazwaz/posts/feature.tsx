import { useStore } from 'effector-react';
import { Post } from 'features/fazwaz/posts/post/component';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $fazwazPosts } from 'models/fazwaz/model';
import React from 'react';
import { CardList } from 'ui/card';

export const Posts = () => {
  const posts = useStore($fazwazPosts);

  const viewedPosts = useViewedPosts({
    posts,
    postsOnInitialView: 15,
  });

  return (
    <CardList>
      {viewedPosts.map((post) => (
        <Post fazwazPost={post} key={post.id} />
      ))}
    </CardList>
  );
};
