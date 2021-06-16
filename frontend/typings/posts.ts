export interface SavePosts {
  id: string;
  selectedGroupId: string | undefined;
  numberOfPosts: number;
  timeStamps: Array<number> | null;
  min?: number;
  max?: number;
}

export interface PartPosts {
  postsByGroup: number;
  cacheKey: string;
  from: number;
  to: number;
}
