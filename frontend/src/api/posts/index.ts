import { apiConfig } from "../config";

export const getPostsApi = ({
  numberOfPosts,
  groupsIds,
}: {
  numberOfPosts: number;
  groupsIds: Array<number>;
}) =>
  apiConfig
    .get(`posts?groupsIds=${groupsIds}&numberOfPosts=${numberOfPosts}`)
    .json();
