import { apiConfig } from "../config";
import { GroupSettings } from "../../models/group_settings/model";

export const getPostsApi = ({
  numberOfPosts,
  selectedGroupId,
  id,
  timeStamps,
  price,
}: GroupSettings) => {
  const params = new URLSearchParams();

  params.set("id", id);
  params.set("numberOfPosts", String(numberOfPosts));

  if (timeStamps) {
    params.set("timeStamps", String(timeStamps));
  }

  if (price.min) {
    params.set("minPrice", String(price.min));
  }

  if (price.max) {
    params.set("maxPrice", String(price.max));
  }

  if (selectedGroupId) {
    params.set("selectedGroupId", selectedGroupId);
  }

  return apiConfig.get(`posts?${params.toString()}`).json();
};
