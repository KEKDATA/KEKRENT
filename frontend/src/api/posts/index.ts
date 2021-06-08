import { apiConfig } from "../config";

export const getPostsApi = ({
  numberOfPosts,
  groupsIds,
  timeStamps,
}: {
  numberOfPosts: number;
  groupsIds: Array<number>;
  timeStamps: Array<number>;
}) =>
  apiConfig
    .get(
      `posts?groupsIds=${groupsIds}&numberOfPosts=${numberOfPosts}&timeStamps=${timeStamps}`
    )
    .json();
