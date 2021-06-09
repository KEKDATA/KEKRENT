import { Record, String, Number, Static, Optional, Array } from "runtypes";

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
export type PostsType = Static<typeof PostsContract>;
export type PostType = Static<typeof Post>;
