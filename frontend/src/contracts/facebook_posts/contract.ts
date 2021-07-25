import {
  Record,
  String,
  Number,
  Static,
  Optional,
  Array,
  Literal,
  Null,
} from 'runtypes';

const Post = Record({
  id: String,
  title: String,
  price: String,
  address: String,
  description: Array(String),
  publishDate: String,
  timestamp: Number,
  link: String,
  photos: Array(String),
  groupTitle: Optional(String),
});

export const FacebookPostsContract = Array(Post);

export const FacebookSavePostsContract = Record({
  status: Literal('success').Or(Literal('failed')),
  postsByGroup: Optional(Number).Or(Null),
  cacheKey: Optional(String).Or(Null),
});
export type FacebookPostsType = Static<typeof FacebookPostsContract>;
export type FacebookSavePostsType = Static<typeof FacebookSavePostsContract>;
export type FacebookPostType = Static<typeof Post>;
