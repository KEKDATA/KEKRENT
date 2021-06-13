import { createEffect, createEvent, createStore, guard } from "effector-root";
import { getPostsApi } from "../../api/posts";
import { PostsContract, PostsType } from "../../contracts/posts/contract";
import { GroupSettings } from "../group_settings/model";

export const getPostsFx = createEffect<GroupSettings, unknown>(getPostsApi);

const postsReceived = guard<unknown, PostsType>(
  getPostsFx.doneData.map((data) => data),
  {
    filter: PostsContract.guard,
  }
);

export const clearPosts = createEvent();
export const $posts = createStore<PostsType>([])
  .on(postsReceived, (prevPosts, posts) => [...prevPosts, ...posts])
  .reset(clearPosts);
