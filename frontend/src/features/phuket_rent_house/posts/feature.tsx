import { useStore } from 'effector-react';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $phuketRentHousePosts } from 'models/phuket_rent_house/model';
import React from 'react';
import { CardList } from 'ui/card/ui';

export const Posts = () => {
  const posts = useStore($phuketRentHousePosts);

  const viewedPosts = useViewedPosts({
    posts,
    postsOnInitialView: 15,
  });

  return <CardList>{viewedPosts.map((post) => post.title)}</CardList>;
};
