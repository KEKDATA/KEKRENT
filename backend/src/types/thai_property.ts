export interface ThaiPropertyPost {
  link: string;
  title: string;
  location: string;
  priceTitle: string;
  imagesLinks: string[];
  descriptions: string[];
  features: { name: string; value: string }[];
  facilities: string[];
  linkToRequestDetails?: string;
  price?: number;
}

export type ThaiPropertyPosts = Array<ThaiPropertyPost>;

export interface ThaiProperty {
  posts: ThaiPropertyPosts;
  totalFacilities: ThaiPropertyPost['facilities'];
}
