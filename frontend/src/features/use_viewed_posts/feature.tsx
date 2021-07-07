import { useStore } from 'effector-react';
import {
  $isScrolledToLastViewedPost,
  scrolledToLastViewPostActivated,
  scrolledToLastViewPostCleared,
} from 'models/scroll_to_last_viewed_post/model';
import { useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

export const useViewedPosts = ({
  posts,
  postsOnInitialView = 15,
}: {
  posts: any[];
  postsOnInitialView: number;
}) => {
  const isScrolledToLastViewedPost = useStore($isScrolledToLastViewedPost);

  useBottomScrollListener(scrolledToLastViewPostActivated, {
    offset: 600,
    debounce: 200,
  });

  useEffect(() => {
    return () => {
      scrolledToLastViewPostCleared();
    };
  }, []);

  return isScrolledToLastViewedPost
    ? posts
    : posts.slice(0, postsOnInitialView);
};
