import { get, set } from 'node-cache-redis';

import { initializedFastify } from '../../config';
import { getParsedFazwazRent } from '../../parser/fazwaz_rent';
import { Fazwaz } from '../../types/fazwaz';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';

export const fazwazRentRoute = () => {
  return initializedFastify.get('/parse/fazwaz', async (_, reply) => {
    try {
      console.info(`Fazwaz by pid ${process.pid} requested`);

      const scheduledPosts: Fazwaz = await get(CacheKeys.Fazwaz);

      if (!scheduledPosts) {
        const parsed = await getParsedFazwazRent({ countOfSearchItems: 90 });

        set(CacheKeys.Fazwaz, parsed, CacheTime.Fazwaz);

        return parsed;
      }

      return scheduledPosts;
    } catch (err) {
      console.error(err);
      reply.code(500).send({ message: 'Something wrong' });
    }
  });
};
