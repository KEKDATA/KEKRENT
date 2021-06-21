import { apiConfig } from '../config';
import { getSearchParams } from 'lib/get_search_params';
import { PartPosts, Posts } from 'typings/posts';
import { PostsType } from 'contracts/posts/contract';

export const postsApi = (params: Posts): Promise<PostsType> =>
  apiConfig.get(`posts?${getSearchParams(params).toString()}`).json();

export const partPostsApi = (params: PartPosts): Promise<PostsType> =>
  apiConfig.get(`partPosts?${getSearchParams(params).toString()}`).json();
