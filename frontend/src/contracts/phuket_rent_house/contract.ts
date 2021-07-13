import {
  Record,
  String,
  Static,
  Array,
  Optional,
  Boolean,
  Null,
} from 'runtypes';

const BasicInfoContract = Record({
  title: String,
  numberOptions: Array(Record({ count: String, description: String })),
  booleanOptions: Array(Record({ isChecked: Boolean, description: String })),
});

const Post = Record({
  link: String,
  price: Optional(String).Or(Null),
  basicInfoFirst: Optional(BasicInfoContract).Or(Null),
  basicInfoLast: Optional(BasicInfoContract).Or(Null),
  title: String,
  texts: Array(String),
  photosLinks: Array(String),
  siteMapLink: Optional(String).Or(Null),
  aboutPrices: Array(String),
});

const PhuketRentHousePostsContract = Array(Post);
export const PhuketRentHouseContract = Record({
  posts: PhuketRentHousePostsContract,
  totalBooleanOptions: Array(String),
});

export type PhuketRentHouseBasicInfoType = Static<typeof BasicInfoContract>;
export type PhuketRentHousePostsType = Static<
  typeof PhuketRentHousePostsContract
>;
export type PhuketRentHousePostType = Static<typeof Post>;
export type PhuketRentHouseType = Static<typeof PhuketRentHouseContract>;
