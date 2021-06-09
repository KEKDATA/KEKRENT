import { apiConfig } from "../config";

export const getPostsApi = ({
  numberOfPosts,
  groupsIds,
  timeStamps,
}: {
  numberOfPosts: number;
  groupsIds: Array<number>;
  timeStamps: Array<number> | null;
}) => {
  const params = new URLSearchParams();

  params.set("numberOfPosts", String(numberOfPosts));
  params.set("groupsIds", String(groupsIds));

  if (timeStamps) {
    params.set("timeStamps", String(timeStamps));
  }

  return apiConfig.get(`posts?${params.toString()}`).json();
};
