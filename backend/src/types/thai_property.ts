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
}

export type ThaiPropertyPosts = Array<ThaiPropertyPost>;
