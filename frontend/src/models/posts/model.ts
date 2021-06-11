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
    price: { min?: number; max?: number };
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

export const minPriceChanged = createEvent<number>();
export const maxPriceChanged = createEvent<number>();
export const $price = createStore<{ min?: number; max?: number }>({
  min: 0,
  max: undefined,
})
  .on(minPriceChanged, (prev, minPrice) => ({ min: minPrice, max: prev.max }))
  .on(maxPriceChanged, (prev, maxPrice) => ({ min: prev.min, max: maxPrice }));

export const getPosts = attach({
  effect: getPostsFx,
  source: {
    numberOfPosts: $numberOfPosts,
    groupsIds: $groupsIds,
    timeStamps: $timeStamps,
    price: $price,
  },
  mapParams: (_, source) => source,
});
