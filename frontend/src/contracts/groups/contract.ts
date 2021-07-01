import { Record, String, Static, Array } from 'runtypes';

const Group = Record({
  id: String,
  title: String,
  size: String,
  posts: String,
});

export const GroupsContract = Array(Group);
export type GroupsType = Static<typeof GroupsContract>;
export type GroupType = Static<typeof Group>;
