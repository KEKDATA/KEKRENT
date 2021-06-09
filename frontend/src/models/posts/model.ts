import {
  createEffect,
  createEvent,
  createStore,
  guard,
  attach,
  restore,
} from "effector-root";
import { getPostsApi } from "../../api/posts";
import { PostsContract, PostsType } from "../../contracts/posts/contract";

const getPostsFx = createEffect<
  {
    numberOfPosts: number;
    groupsIds: Array<number>;
    timeStamps: Array<number> | null;
  },
  unknown
>(getPostsApi);

const postsReceived = guard<unknown, PostsType>(
  getPostsFx.doneData.map((data) => data),
  {
    filter: PostsContract.guard,
  }
);

export const $posts = createStore<PostsType>([]).on(
  postsReceived,
  (_, posts) => posts
);

export const numberOfPostsChanged = createEvent<number>();
export const $numberOfPosts = restore(numberOfPostsChanged, 1);

export const groupsIdsSelected = createEvent<Array<number>>();
export const $groupsIds = restore(groupsIdsSelected, []);

export const timeStampsSelected = createEvent<Array<number>>();
export const $timeStamps = restore(timeStampsSelected, null);

export const getPosts = attach({
  effect: getPostsFx,
  source: {
    numberOfPosts: $numberOfPosts,
    groupsIds: $groupsIds,
    timeStamps: $timeStamps,
  },
  mapParams: (_, source) => source,
});
