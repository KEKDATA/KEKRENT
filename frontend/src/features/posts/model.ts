import {
  createEffect,
  createEvent,
  createStore,
  guard,
  attach,
  restore,
} from "effector-root";
import { getPostsApi } from "../../api/posts";
import { PostsContract, PostsTypes } from "../../contracts/posts";

const getPostsFx = createEffect<
  {
    numberOfPosts: number;
    groupsIds: Array<number>;
  },
  unknown
>(getPostsApi);

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

export const numberOfPostsChanged = createEvent<number>();
export const $numberOfPosts = restore(numberOfPostsChanged, 1);

export const groupsIdsSelected = createEvent<Array<number>>();
export const $groupsIds = restore(groupsIdsSelected, []);

export const getPosts = attach({
  effect: getPostsFx,
  source: { numberOfPosts: $numberOfPosts, groupsIds: $groupsIds },
  mapParams: (_, source) => source,
});
