import { ThaiPropertyPostsType } from 'contracts/thai_property/contract';
import { useStore } from 'effector-react';
import { Post } from 'features/thai_property/posts/post/component';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $thaiPropertyPosts } from 'models/thai_property/model';
import React from 'react';
import { CardList } from 'ui/card';

export const Posts = () => {
  const posts = useStore($thaiPropertyPosts);

  const viewedPosts: ThaiPropertyPostsType = useViewedPosts({
    posts,
    postsOnInitialView: 15,
  });

  return (
    <CardList>
      {viewedPosts.map((post) => (
        <Post post={post} key={post.link} />
      ))}
    </CardList>
  );
};
