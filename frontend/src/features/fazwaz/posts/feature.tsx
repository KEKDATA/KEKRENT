import { useStore } from 'effector-react';
import { Post } from 'features/fazwaz/posts/post/component';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $fazwazPosts } from 'models/fazwaz/model';
import React from 'react';
import { CardList } from 'ui/card/ui';

export const Posts = () => {
  const fazwazPosts = useStore($fazwazPosts);

  const viewedPosts = useViewedPosts({
    posts: fazwazPosts,
    postsOnInitialView: 15,
  });

  return (
    <CardList>
      {viewedPosts.map((fazwazPost) => (
        <Post fazwazPost={fazwazPost} key={fazwazPost.id} />
      ))}
    </CardList>
  );
};
