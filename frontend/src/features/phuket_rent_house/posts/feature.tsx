import { PhuketRentHousePostsType } from 'contracts/phuket_rent_house/contract';
import { useStore } from 'effector-react';
import { Post } from 'features/phuket_rent_house/posts/post/component';
import { useViewedPosts } from 'features/use_viewed_posts/feature';
import { $phuketRentHousePosts } from 'models/phuket_rent_house/model';
import React from 'react';
import { CardList } from 'ui/card/ui';

export const Posts = () => {
  const posts = useStore($phuketRentHousePosts);

  const viewedPosts: PhuketRentHousePostsType = useViewedPosts({
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
