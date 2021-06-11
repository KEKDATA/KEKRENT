import { apiConfig } from "../config";

export const getPostsApi = ({
  numberOfPosts,
  groupsIds,
  timeStamps,
  price,
}: {
  numberOfPosts: number;
  groupsIds: Array<number>;
  timeStamps: Array<number> | null;
  price: { min?: number; max?: number };
}) => {
  const params = new URLSearchParams();

  params.set("numberOfPosts", String(numberOfPosts));
  params.set("groupsIds", String(groupsIds));

  if (timeStamps) {
    params.set("timeStamps", String(timeStamps));
  }

  if (price.min) {
    params.set("minPrice", String(price.min));
  }

  if (price.max) {
    params.set("maxPrice", String(price.max));
  }

  return apiConfig.get(`posts?${params.toString()}`).json();
};
