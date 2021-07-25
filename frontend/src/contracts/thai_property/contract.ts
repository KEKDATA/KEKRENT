import { Record, String, Static, Array, Optional } from 'runtypes';

const Post = Record({
  link: String,
  title: String,
  location: String,
  priceTitle: String,
  imagesLinks: Array(String),
  descriptions: Array(String),
  features: Array(Record({ name: String, value: String })),
  facilities: Array(String),
  linkToRequestDetails: Optional(String),
});

export const ThaiPropertyPostsContract = Array(Post);

export type ThaiPropertyPostType = Static<typeof Post>;
export type ThaiPropertyPostsType = Static<typeof ThaiPropertyPostsContract>;
