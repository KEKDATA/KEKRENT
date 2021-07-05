export interface PetsInfo {
  isAllowed: boolean;
  isNA: boolean;
  description: string;
}

export type ProjectHighlights = Array<{
  link: string;
  image: string;
  title: string;
}>;

export interface Feature {
  text: string;
  image?: string | undefined;
}

export interface FazwazPost {
  id: string;
  photos: string[];
  price: string;
  title: string;
  location: string;
  link: string;
  description: string;
  availableNow: string;
  petsInfo: PetsInfo;
  projectHighlights: ProjectHighlights;
  features: Feature[];
  contacts: Array<{ image: string; text: string; link: string }>;
  basicInforms: { topic: string; info: string }[];
}

export type FazwazPosts = Array<FazwazPost>;
export type Fazwaz = { posts: FazwazPosts; totalFeatures: string[] };
