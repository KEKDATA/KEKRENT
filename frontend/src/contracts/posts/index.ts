import {
  Record,
  String,
  Number,
  Static,
  Optional,
  Array,
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
export type PostsTypes = Static<typeof PostsContract>;
export type PostTypes = Static<typeof Post>;
