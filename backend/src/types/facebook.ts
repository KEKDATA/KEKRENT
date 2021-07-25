export enum FacebookPostMode {
  Slowpoke = 'slowpoke',
  Faster = 'faster',
}

export interface FacebookPost {
  id: string;
  title: string;
  price: string;
  address: string;
  description: string[];
  publishDate: string;
  timestamp: number;
  link?: string;
  photos: string[];
  groupTitle?: string;
}

interface PredictedPost extends FacebookPost {
  classIndex: number;
  prob: number;
}

export type FacebookUniqPosts = { [key: string]: FacebookPost };
export type FacebookPosts = Array<FacebookPost>;
export type FacebookPredictedPosts = Array<PredictedPost>;

export interface FacebookPostsSettings {
  id: string;
  selectedGroupId: string;
  numberOfPosts: string;
  mode: FacebookPostMode;
  timeStamps?: string;
  minPrice?: string;
  maxPrice?: string;
  title?: string;
}

export interface FacebookPartPostsSettings {
  from: string;
  to: string;
  cacheKey: string;
  postsByGroup: string;
}
