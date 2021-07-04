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
  features: { text: string; image?: string | undefined }[];
  basicInforms: { topic: string; info: string }[];
}

export type FazwazPosts = Array<FazwazPost>;
