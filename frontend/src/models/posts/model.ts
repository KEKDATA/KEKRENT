import {
  createEffect,
  createEvent,
  createStore,
  forward,
  guard,
} from "effector-root";
import { partPostsApi, savePostsApi } from "../../api/posts";
import {
  PostsContract,
  PostsType,
  SavePostsContract,
  SavePostsType,
} from "../../contracts/posts/contract";
import { PartPosts, SavePosts } from "../../../typings/posts";

export const savePostsFx = createEffect<SavePosts, SavePostsType>(savePostsApi);

const partPostsFx = createEffect<PartPosts, unknown>(partPostsApi);

const savePostsReceived = guard(savePostsFx.doneData, {
  filter: (response) => SavePostsContract.guard(response),
});

savePostsReceived.watch(({ status, postsByGroup, cacheKey }) => {
  if (status === "success" && cacheKey && postsByGroup) {
    for (let from = 0; from < postsByGroup; from += 30) {
      setTimeout(() => {
        partPostsFx({ cacheKey, from, to: from + 30, postsByGroup });
      }, 300);
    }
  }
});

const postsReceived = guard<unknown, PostsType>(partPostsFx.doneData, {
  filter: PostsContract.guard,
});

export const postsCleared = createEvent();
export const $posts = createStore<PostsType>([])
  .on(postsReceived, (prevPosts, posts) => [...prevPosts, ...posts])
  .reset(postsCleared);

forward({
  from: savePostsFx,
  to: postsCleared,
});
