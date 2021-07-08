import { $selectedGroupsIds } from '../group_settings/model';
import { $groups } from '../groups/model';
import { createEvent, createStore, guard, restore, sample } from 'effector';
import {
  $nonFiltersFacebookPosts,
  $facebookPosts,
  $somePartOfPostsLoaded,
  postsCleared,
  postsUpdated,
} from 'models/facebook/posts/model';
import {
  getFilteredPostsByDate,
  getFilteredPostsByPrice,
} from 'models/facebook/posts_filters/utils';
import { PostsFilter } from 'typings/posts_filters';

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

export const $submittedGroups = createStore<string[]>([]).reset(postsCleared);

export const $checkedGroups = restore(
  filterPostsByCheckedGroupsSelected,
  [],
).reset([postsCleared, filterPostsCleared]);

sample({
  source: [$checkedGroups, $nonFiltersFacebookPosts, $priceFilter, $dateFilter],
  clock: filterPostsByCheckedGroupsSubmitted,
  fn: ([checkedGroups, posts, priceFilter, dateFilter]) => {
    const filteredPosts = posts.filter(
      ({ groupTitle }) => groupTitle && checkedGroups.includes(groupTitle),
    );

    const isDateFilterActivated = Boolean(dateFilter);
    const isPriceFilterActivated = Boolean(priceFilter);

    switch (true) {
      case isDateFilterActivated: {
        return getFilteredPostsByDate(filteredPosts, dateFilter);
      }

      case isPriceFilterActivated: {
        return getFilteredPostsByPrice(filteredPosts, priceFilter);
      }

      default: {
        return filteredPosts;
      }
    }
  },
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

sample({
  clock: $priceFilter,
  source: $facebookPosts,
  fn: (posts, priceFilter) => {
    if (!priceFilter) {
      return posts;
    }

    return getFilteredPostsByPrice(posts, priceFilter);
  },
  target: postsUpdated,
});

sample({
  clock: $dateFilter,
  source: $facebookPosts,
  fn: (posts, dateFilter) => {
    if (!dateFilter) {
      return posts;
    }

    return getFilteredPostsByDate(posts, dateFilter);
  },
  target: postsUpdated,
});

sample({
  clock: filterPostsCleared,
  source: $nonFiltersFacebookPosts,
  target: postsUpdated,
});
