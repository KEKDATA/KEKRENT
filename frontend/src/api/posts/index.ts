import { apiConfig } from '../config';
import { FacebookPostsType } from 'contracts/facebook_posts/contract';
import { getSearchParams } from 'lib/get_search_params';
import { PartPosts, Posts } from 'typings/posts';

export const postsApi = (params: Posts): Promise<FacebookPostsType> =>
  apiConfig.get(`parse/posts?${getSearchParams(params).toString()}`).json();

export const partPostsApi = (params: PartPosts): Promise<FacebookPostsType> =>
  apiConfig.get(`parse/partPosts?${getSearchParams(params).toString()}`).json();
