import { useList } from 'effector-react';
import { Post } from 'features/fazwaz/posts/post/component';
import { $fazwazPosts } from 'models/fazwaz/model';
import React from 'react';
import { CardList } from 'ui/card/ui';

export const Posts = () => {
  return (
    <CardList>
      {useList($fazwazPosts, (fazwazPost) => (
        <Post fazwazPost={fazwazPost} key={fazwazPost.id} />
      ))}
    </CardList>
  );
};
