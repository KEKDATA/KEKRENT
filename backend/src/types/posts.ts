export enum PostMode {
  Slowpoke = 'slowpoke',
  Faster = 'faster',
}

export interface Post {
  id: string;
  title: string;
  price: string;
  address: string;
  description: string[];
  publishDate: string;
  timestamp: number;
  link?: string;
  photos: string[];
}

interface PredictedPost extends Post {
  classIndex: number;
  prob: number;
}

export type UniqPosts = { [key: string]: Post };
export type Posts = Array<Post>;
export type PredictedPosts = Array<PredictedPost>;

export interface PostsSettings {
  id: string;
  selectedGroupId: string;
  numberOfPosts: string;
  mode: PostMode;
  timeStamps?: string;
  minPrice?: string;
  maxPrice?: string;
}

export interface PartPostsSettings {
  from: string;
  to: string;
  cacheKey: string;
  postsByGroup: string;
}
