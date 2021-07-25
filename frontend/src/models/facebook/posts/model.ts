import { postsApi } from 'api/posts';
import {
  FacebookPostsContract,
  FacebookPostsType,
  FacebookPostType,
} from 'contracts/facebook_posts/contract';
import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from 'effector';
import { Posts } from 'typings/posts';

export const getPostsFx = createEffect<Posts, FacebookPostsType>(postsApi);

const postsReceived = guard(getPostsFx.doneData, {
  filter: (response) => FacebookPostsContract.guard(response),
});

const getDeduplicatedPosts = (posts: FacebookPostsType) => {
  const deduplicatedPosts: { [key: string]: FacebookPostType } = {};

  posts.forEach((post) => {
    deduplicatedPosts[`${post.title}${post.price}${post.description.length}`] =
      post;
  });

  return Object.values(deduplicatedPosts);
};

export const postsCleared = createEvent();
export const postsUpdated = createEvent<FacebookPostsType>();

export const $nonFiltersFacebookPosts = createStore<FacebookPostsType>([])
  .on(postsReceived, (prevPosts, posts) =>
    getDeduplicatedPosts([...prevPosts, ...posts]),
  )
  .reset(postsCleared);
export const $facebookPosts = createStore<FacebookPostsType>([])
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
