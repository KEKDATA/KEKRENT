import { createEvent, createStore } from 'effector';

export const scrolledToLastViewPostActivated = createEvent<unknown>();
export const scrolledToLastViewPostCleared = createEvent();
export const $isScrolledToLastViewedPost = createStore(false)
  .on(scrolledToLastViewPostActivated, () => true)
  .reset(scrolledToLastViewPostCleared);
