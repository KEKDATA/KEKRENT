import { get, set } from 'node-cache-redis';

import { initializedFastify } from '../../config';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';
import { ThaiPropertyPosts } from '../../types/thai_property';
import { getParsedThaiRentProperty } from '../../parser/thai_property';

export const thaiPropertyRoute = () => {
  return initializedFastify.get('/parse/thaiproperty', async (_, reply) => {
    try {
      console.info(`Phuket thai property by pid ${process.pid} requested`);

      const scheduledPosts: ThaiPropertyPosts = await get(
        CacheKeys.ThaiProperty,
      );

      if (!scheduledPosts) {
        const parsed = await getParsedThaiRentProperty({
          countOfSearchItems: 90,
        });

        set(CacheKeys.ThaiProperty, parsed, CacheTime.ThaiProperty);

        return parsed;
      }

      return scheduledPosts;
    } catch (err) {
      console.error(err);
      reply.code(500).send({ message: 'Something wrong' });
    }
  });
};
