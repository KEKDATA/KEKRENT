import {
  Record,
  String,
  Number,
  Static,
  Optional,
  Array,
  Literal,
  Null,
} from "runtypes";

const Post = Record({
  id: String,
  title: String,
  price: String,
  address: String,
  description: String,
  publishDate: String,
  timestamp: Number,
  link: Optional(String),
  photos: Array(String),
});

export const PostsContract = Array(Post);

export const SavePostsContract = Record({
  status: Literal("success").Or(Literal("failed")),
  postsByGroup: Optional(Number).Or(Null),
  cacheKey: Optional(String).Or(Null),
});
export type PostsType = Static<typeof PostsContract>;
export type SavePostsType = Static<typeof SavePostsContract>;
export type PostType = Static<typeof Post>;
