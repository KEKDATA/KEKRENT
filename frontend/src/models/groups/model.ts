import { createEffect, createStore, guard } from "effector-root";
import { getGroupsApi } from "../../api/groups";
import { GroupsContract, GroupsType } from "../../contracts/groups/contract";

export const getGroupsFx = createEffect(getGroupsApi);

export const groupsReceived = guard<unknown, GroupsType>(
  getGroupsFx.doneData.map((data) => data),
  {
    filter: GroupsContract.guard,
  }
);

export const $groups = createStore<GroupsType>([]).on(
  groupsReceived,
  (_, groups) => groups
);
