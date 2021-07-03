import { createEffect, guard, restore } from 'effector';
import { getGroupsApi } from 'api/groups';
import { GroupsContract, GroupsType } from 'contracts/groups/contract';

export const getGroupsFx = createEffect(getGroupsApi);

export const groupsReceived = guard<unknown, GroupsType>(getGroupsFx.doneData, {
  filter: GroupsContract.guard,
});

export const $groups = restore(groupsReceived, []);
