import { createEvent, createStore } from 'effector';
import { nanoid } from 'nanoid';
import { GroupSettings, Modes } from 'typings/groups';

const numberOfPostsChanged = createEvent<{
  id: string;
  numberOfPosts: number;
}>();
const groupIdChanged = createEvent<{
  id: string;
  selectedGroupId: string | undefined;
}>();
const timeStampsChanged = createEvent<{
  id: string;
  timeStamps: Array<number> | null;
}>();
const maxPriceChanged = createEvent<{
  id: string;
  max: number;
}>();
const minPriceChanged = createEvent<{
  id: string;
  min: number;
}>();
const addGroup = createEvent<unknown>();
const addSelectedGroup = createEvent<{ selectedGroupId: string }>();
const removeSelectedGroup =
  createEvent<{ id?: string; selectedGroupId?: string }>();
const modeChanged = createEvent<{ id: string; mode: Modes }>();

const changeGroupSettings = (
  groupsSettings: GroupSettings[],
  id: string,
  key: string,
  value: any,
) =>
  groupsSettings.map((groupSettings) =>
    groupSettings.id === id
      ? { ...groupSettings, [key]: value }
      : groupSettings,
  );

const initialGroupSettings = {
  id: nanoid(),
  selectedGroupId: undefined,
  numberOfPosts: null,
  timeStamps: null,
  price: { min: undefined, max: undefined },
  mode: Modes.Faster,
};

export const $groupsSettings = createStore<GroupSettings[]>([])
  .on(addGroup, (groupsSettings) => [
    ...groupsSettings,
    { ...initialGroupSettings, id: nanoid() },
  ])
  .on(addSelectedGroup, (groupsSettings, { selectedGroupId }) => [
    ...groupsSettings,
    { ...initialGroupSettings, id: nanoid(), selectedGroupId },
  ])
  .on(removeSelectedGroup, (groupsSettings, { id, selectedGroupId }) =>
    groupsSettings.filter((groupSettings) => {
      if (id) {
        return groupSettings.id !== id;
      }

      if (selectedGroupId) {
        return groupSettings.selectedGroupId !== selectedGroupId;
      }

      return true;
    }),
  )
  .on(modeChanged, (groupsSettings, { id, mode }) =>
    changeGroupSettings(groupsSettings, id, 'mode', mode),
  )
  .on(numberOfPostsChanged, (groupsSettings, { id, numberOfPosts }) =>
    changeGroupSettings(groupsSettings, id, 'numberOfPosts', numberOfPosts),
  )
  .on(groupIdChanged, (groupsSettings, { id, selectedGroupId }) =>
    changeGroupSettings(groupsSettings, id, 'selectedGroupId', selectedGroupId),
  )
  .on(timeStampsChanged, (groupsSettings, { id, timeStamps }) =>
    changeGroupSettings(groupsSettings, id, 'timeStamps', timeStamps),
  )
  .on(maxPriceChanged, (groupsSettings, { id, max }) =>
    groupsSettings.map((groupSettings) =>
      groupSettings.id === id
        ? { ...groupSettings, price: { min: groupSettings.price.min, max } }
        : groupSettings,
    ),
  )
  .on(minPriceChanged, (groupsSettings, { id, min }) =>
    groupsSettings.map((groupSettings) =>
      groupSettings.id === id
        ? { ...groupSettings, price: { min, max: groupSettings.price.max } }
        : groupSettings,
    ),
  );

export const $selectedGroupsIds = $groupsSettings.map(
  (groupsSettings) =>
    groupsSettings
      .map(({ selectedGroupId }) => selectedGroupId)
      .filter(Boolean) as [] | string[],
);

export const groupSettingsEvents = {
  numberOfPostsChanged,
  groupIdChanged,
  timeStampsChanged,
  maxPriceChanged,
  minPriceChanged,
  addGroup,
  addSelectedGroup,
  removeSelectedGroup,
  modeChanged,
};
