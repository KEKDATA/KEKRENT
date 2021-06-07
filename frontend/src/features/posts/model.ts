import { createEffect, createStore, guard } from "effector-root";
import { getPostsApi } from "../../api/posts";
import { PostsContract, PostsTypes } from "../../contracts/posts";

export const getPostsFx = createEffect(getPostsApi);

export const postsReceived = guard<unknown, PostsTypes>(
  getPostsFx.doneData.map((data) => data),
  {
    filter: PostsContract.guard,
  }
);

export const $posts = createStore<PostsTypes>([]).on(
  postsReceived,
  (_, posts) => posts
);
