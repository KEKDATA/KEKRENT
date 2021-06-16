import { apiConfig } from "../config";
import { getSearchParams } from "../../lib/get_search_params";
import { PartPosts, SavePosts } from "../../../typings/posts";
import { PostsType, SavePostsType } from "../../contracts/posts/contract";

export const savePostsApi = (params: SavePosts): Promise<SavePostsType> =>
  apiConfig.post(`savePosts?${getSearchParams(params).toString()}`).json();

export const partPostsApi = (params: PartPosts): Promise<PostsType> =>
  apiConfig.get(`partPosts?${getSearchParams(params).toString()}`).json();
