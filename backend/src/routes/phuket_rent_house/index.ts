import { get, set } from 'node-cache-redis';

import { initializedFastify } from '../../config';
import { CacheKeys } from '../../constants/cache_keys';
import { PhuketRentHouse } from '../../types/phuket_rent_house';
import { getParsedPhuketRentHouse } from '../../parser/phuket_rent_house';
import { CacheTime } from '../../constants/cache_time';

export const phuketRentHouseRoute = () => {
  return initializedFastify.get('/parse/phuketrenthouse', async (_, reply) => {
    try {
      console.info(`Phuket rent house by pid ${process.pid} requested`);

      const scheduledPosts: PhuketRentHouse[] = await get(
        CacheKeys.PhuketRentHouse,
      );

      if (!scheduledPosts) {
        const parsed = await getParsedPhuketRentHouse({
          countOfSearchItems: 90,
        });

        set(CacheKeys.PhuketRentHouse, parsed, CacheTime.PhuketRentHouse);

        return parsed;
      }

      return scheduledPosts;
    } catch (err) {
      console.error(err);
      reply.code(500).send({ message: 'Something wrong' });
    }
  });
};
