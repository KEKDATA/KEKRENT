import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from "effector-root";
import { partPostsApi, postsApi } from "../../api/posts";
import {
  PostsContract,
  PostsType,
} from "../../contracts/posts/contract";
import { PartPosts, Posts } from "../../../typings/posts";

export const getPostsFx = createEffect<Posts, PostsType>(postsApi);

const partPostsFx = createEffect<PartPosts, unknown>(partPostsApi);

const postsReceived = guard(getPostsFx.doneData, {
  filter: (response) => PostsContract.guard(response),
});


export const postsCleared = createEvent();
export const $posts = createStore<PostsType>([])
  .on(postsReceived, (prevPosts, posts) => {
    console.log([...prevPosts, ...posts].length)
    return [...prevPosts, ...posts]
  })
  .reset(postsCleared);

forward({
  from: getPostsFx,
  to: postsCleared,
});
