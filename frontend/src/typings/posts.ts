import { Modes } from './groups';

export interface Posts {
  id: string;
  selectedGroupId: string | undefined;
  numberOfPosts: number;
  timeStamps: Array<number> | null;
  mode: Modes;
  min?: number;
  max?: number;
}

export interface PartPosts {
  postsByGroup: number;
  cacheKey: string;
  from: number;
  to: number;
}
