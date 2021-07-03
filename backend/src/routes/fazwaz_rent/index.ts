import { get, set } from 'node-cache-redis';

import { initializedFastify } from '../../config';
import { getParsedFazwazRent } from '../../parser/fazwaz_rent';
import { FazwazPosts } from '../../types/fazwaz';
import { CacheKeys } from '../../constants/cache_keys';

const fourHours = 14400;

export const fazwazRentRoute = () => {
  return initializedFastify.get('/parse/fazwaz', async (request, reply) => {
    console.info(`Fazwaz by pid ${process.pid} requested`);

    const scheduledPosts: FazwazPosts = await get(CacheKeys.Fazwaz);

    if (!scheduledPosts) {
      const posts = await getParsedFazwazRent({ countOfSearchItems: 60 });

      set(CacheKeys.Fazwaz, posts, fourHours);

      return posts;
    }

    return scheduledPosts;
  });
};
