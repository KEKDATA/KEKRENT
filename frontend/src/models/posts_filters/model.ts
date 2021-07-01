import { createEvent, createStore, guard, restore, sample } from 'effector';
import {
  $nonFiltersPosts,
  $posts,
  $somePartOfPostsLoaded,
  postsCleared,
  postsUpdated,
} from 'models/posts/model';
import { PostsFilter } from 'typings/posts_filters';
import { $groups } from '../groups/model';
import { $selectedGroupsIds } from '../group_settings/model';

const toggleFilter = (filterValue: PostsFilter | null) => {
  if (filterValue === null || filterValue === PostsFilter.FromMax) {
    return PostsFilter.FromMin;
  }

  if (filterValue === PostsFilter.FromMin) {
    return PostsFilter.FromMax;
  }

  return null;
};

export const filterPostsByPriceToggled = createEvent<unknown>();
export const filterPostsByDateToggled = createEvent<unknown>();
export const filterPostsByCheckedGroupsSelected = createEvent<string[]>();
export const filterPostsByCheckedGroupsSubmitted = createEvent();
export const filterPostsCleared = createEvent<unknown>();

export const $priceFilter = createStore<PostsFilter | null>(null)
  .on(filterPostsByPriceToggled, toggleFilter)
  .reset([postsCleared, filterPostsByDateToggled, filterPostsCleared]);

export const $dateFilter = createStore<PostsFilter | null>(null)
  .on(filterPostsByDateToggled, toggleFilter)
  .reset([postsCleared, filterPostsByPriceToggled, filterPostsCleared]);

export const $submittedGroups = createStore<string[]>([]).reset([
  postsCleared,
  filterPostsCleared,
]);

export const $checkedGroups = restore(
  filterPostsByCheckedGroupsSelected,
  [],
).reset([postsCleared, filterPostsCleared]);

sample({
  source: [$checkedGroups, $nonFiltersPosts],
  clock: filterPostsByCheckedGroupsSubmitted,
  fn: ([checkedGroups, posts]) =>
    posts.filter(
      ({ groupTitle }) => groupTitle && checkedGroups.includes(groupTitle),
    ),
  target: postsUpdated,
});

const selectedGroupsSubmitted = createEvent();

guard({
  source: $somePartOfPostsLoaded,
  clock: $somePartOfPostsLoaded,
  filter: Boolean,
  target: selectedGroupsSubmitted,
});

sample({
  clock: selectedGroupsSubmitted,
  source: [$groups, $selectedGroupsIds],
  fn: ([groups, selectedGroupsIds]) => {
    const selectedGroupsTitles: string[] = [];

    selectedGroupsIds.forEach((selectedId) => {
      const selectedGroup = groups.find(({ id }) => id === selectedId);

      if (selectedGroup) {
        selectedGroupsTitles.push(selectedGroup.title);
      }
    });

    return selectedGroupsTitles;
  },
  target: $submittedGroups,
});

const getPriceFromString = (value: string) =>
  Number.parseFloat(value.replace(/[^0-9]+/g, '')) || 0;
sample({
  clock: $priceFilter,
  source: $posts,
  fn: (posts, priceFilter) => {
    if (!priceFilter) {
      return posts;
    }

    return [...posts].sort((a, b) => {
      const firstPrice = getPriceFromString(a.price);
      const secondPrice = getPriceFromString(b.price);

      if (priceFilter === PostsFilter.FromMin) {
        return secondPrice - firstPrice;
      }

      return firstPrice - secondPrice;
    });
  },
  target: postsUpdated,
});

sample({
  clock: $dateFilter,
  source: $posts,
  fn: (posts, dateFilter) => {
    if (!dateFilter) {
      return posts;
    }

    return [...posts].sort((a, b) => {
      const firstTimestamp = a.timestamp;
      const secondTimestamp = b.timestamp;

      if (dateFilter === PostsFilter.FromMin) {
        return secondTimestamp - firstTimestamp;
      }

      return firstTimestamp - secondTimestamp;
    });
  },
  target: postsUpdated,
});

sample({
  clock: filterPostsCleared,
  source: $nonFiltersPosts,
  target: postsUpdated,
});
