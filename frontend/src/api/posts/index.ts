import { apiConfig } from "../config";

export const getPostsApi = (groupsIds: Array<number>) =>
  apiConfig.get(`posts?groupsIds=${groupsIds}`).json();
