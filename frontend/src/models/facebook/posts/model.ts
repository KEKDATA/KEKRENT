import { postsApi } from 'api/posts';
import { PostsContract, PostsType, PostType } from 'contracts/posts/contract';
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from 'effector';
import { Posts } from 'typings/posts';

export const getPostsFx = createEffect<Posts, PostsType>(postsApi);

const postsReceived = guard(getPostsFx.doneData, {
  filter: (response) => PostsContract.guard(response),
});

const getDeduplicatedPosts = (posts: PostsType) => {
  const deduplicatedPosts: { [key: string]: PostType } = {};

  posts.forEach((post) => {
    deduplicatedPosts[`${post.title}${post.price}${post.description.length}`] =
      post;
  });

  return Object.values(deduplicatedPosts);
};

export const postsCleared = createEvent();
export const postsUpdated = createEvent<PostsType>();

export const $nonFiltersFacebookPosts = createStore<PostsType>([])
  .on(postsReceived, (prevPosts, posts) =>
    getDeduplicatedPosts([...prevPosts, ...posts]),
  )
  .reset(postsCleared);
export const $facebookPosts = createStore<PostsType>([])
  .on(postsReceived, (prevPosts, posts) =>
    getDeduplicatedPosts([...prevPosts, ...posts]),
  )
  .on(postsUpdated, (_, posts) => posts)
  .reset(postsCleared);

export const $somePartOfPostsLoaded = createStore(false)
  .on(postsReceived, () => true)
  .reset(postsCleared);

forward({
  from: getPostsFx,
  to: postsCleared,
});
