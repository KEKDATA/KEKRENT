export type Posts = Array<{
  id: string;
  title: string;
  price: string;
  address: string;
  description: string;
  publishDate: string;
  timestamp: number;
  link?: string;
  photos: string[];
}>;

export interface PostsSettings {
  id: string;
  selectedGroupId: string;
  numberOfPosts: string;
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
