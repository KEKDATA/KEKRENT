import { Record, String, Static, Array, Optional, Number } from 'runtypes';

const Facilities = Array(String);

const Post = Record({
  link: String,
  title: String,
  location: String,
  priceTitle: String,
  imagesLinks: Array(String),
  descriptions: Array(String),
  features: Array(Record({ name: String, value: String })),
  facilities: Facilities,
  linkToRequestDetails: Optional(String),
  price: Optional(Number),
});

const Posts = Array(Post);

export const ThaiPropertyContract = Record({
  posts: Posts,
  totalFacilities: Facilities,
});

export type ThaiPropertyPostType = Static<typeof Post>;
export type ThaiPropertyPostsType = Static<typeof Posts>;
export type ThaiPropertyType = Static<typeof ThaiPropertyContract>;
