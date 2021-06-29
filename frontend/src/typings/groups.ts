export enum Modes {
  Slowpoke = 'slowpoke',
  Faster = 'faster',
}

export interface GroupSettings {
  id: string;
  selectedGroupId?: string;
  numberOfPosts: number | null;
  timeStamps: Array<number> | null;
  price: { min?: number; max?: number };
  mode: Modes;
}
