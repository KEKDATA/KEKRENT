import { createEvent, createStore } from "effector-root";
import { nanoid } from "nanoid";

export interface GroupSettings {
  id: string;
  selectedGroupId: string | null;
  numberOfPosts: number;
  timeStamps: Array<number> | null;
  price: { min?: number; max?: number };
}

const numberOfPostsChanged = createEvent<{
  id: string;
  numberOfPosts: number;
}>();
const groupIdChanged = createEvent<{
  id: string;
  selectedGroupId: string | null;
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

const changeGroupSettings = (
  groupsSettings: GroupSettings[],
  id: string,
  key: string,
  value: any
) =>
  groupsSettings.map((groupSettings) =>
    groupSettings.id === id ? { ...groupSettings, [key]: value } : groupSettings
  );

const initialGroupSettings = {
  id: nanoid(),
  selectedGroupId: null,
  numberOfPosts: 5,
  timeStamps: null,
  price: { min: 0, max: undefined },
};

export const $groupsSettings = createStore<GroupSettings[]>([
  initialGroupSettings,
])
  .on(addGroup, (groupsSettings) => [
    ...groupsSettings,
    { ...initialGroupSettings, id: nanoid() },
  ])
  .on(numberOfPostsChanged, (groupsSettings, { id, numberOfPosts }) =>
    changeGroupSettings(groupsSettings, id, "numberOfPosts", numberOfPosts)
  )
  .on(groupIdChanged, (groupsSettings, { id, selectedGroupId }) =>
    changeGroupSettings(groupsSettings, id, "selectedGroupId", selectedGroupId)
  )
  .on(timeStampsChanged, (groupsSettings, { id, timeStamps }) =>
    changeGroupSettings(groupsSettings, id, "timeStamps", timeStamps)
  )
  .on(maxPriceChanged, (groupsSettings, { id, max }) =>
    groupsSettings.map((groupSettings) =>
      groupSettings.id === id
        ? { ...groupSettings, price: { min: groupSettings.price.min, max } }
        : groupSettings
    )
  )
  .on(minPriceChanged, (groupsSettings, { id, min }) =>
    groupsSettings.map((groupSettings) =>
      groupSettings.id === id
        ? { ...groupSettings, price: { min, max: groupSettings.price.max } }
        : groupSettings
    )
  );

export const groupSettingsEvents = {
  numberOfPostsChanged,
  groupIdChanged,
  timeStampsChanged,
  maxPriceChanged,
  minPriceChanged,
  addGroup,
};
