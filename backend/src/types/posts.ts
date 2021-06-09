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
