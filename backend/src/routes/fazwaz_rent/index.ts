import { get, set } from 'node-cache-redis';

import { initializedFastify } from '../../config';
import { getParsedFazwazRent } from '../../parser/fazwaz_rent';
import { FazwazPosts } from '../../types/fazwaz';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';

export const fazwazRentRoute = () => {
  return initializedFastify.get('/parse/fazwaz', async () => {
    console.info(`Fazwaz by pid ${process.pid} requested`);

    const scheduledPosts: FazwazPosts = await get(CacheKeys.Fazwaz);

    if (!scheduledPosts) {
      const parsed = await getParsedFazwazRent({ countOfSearchItems: 90 });

      set(CacheKeys.Fazwaz, parsed, CacheTime.Fazwaz);

      return parsed;
    }

    return scheduledPosts;
  });
};
