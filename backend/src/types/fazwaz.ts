export interface FazwazPost {
  id: string;
  photos: string[];
  price: string;
  title: string;
  location: string;
  link: string;
  description: string;
  features: { text: string; image?: string | undefined }[];
  basicInforms: { topic: string; info: string }[];
}

export type FazwazPosts = Array<FazwazPost>;
