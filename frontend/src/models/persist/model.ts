import { createEvent, Store } from 'effector';

interface PersistConfig {
  key: string;
  maxSize?: number;
  expire?: number;
}

const defaultConfig = {
  key: 'persist',
  maxSize: 20,
};

export const withPersist = <State>(
  store: Store<State>,
  config: PersistConfig = defaultConfig,
) => {
  const { key, expire, maxSize } = config;
  const persistKey = key;
  const rehydrate = createEvent('@PERSIST/REHYDRATE');

  if (expire && isExpired(expire)) {
    localStorage.removeItem(persistKey);
  }

  const snapshot = localStorage.getItem(persistKey);

  if (snapshot) {
    store.on(rehydrate, () => JSON.parse(snapshot));
    rehydrate();
  }

  store.watch((state) => {
    localStorage.setItem(
      persistKey,
      JSON.stringify(Array.isArray(state) ? state.slice(0, maxSize) : state),
    );
  });

  return store;
};

const isExpired = (expire: number) => expire < Date.now();
