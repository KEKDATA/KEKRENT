import { initializedFastify, nodeCache } from '../../config';
import { Posts } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';

export const facebookPosts = () => {
  return initializedFastify.get<{
    Querystring: {
      groupsIds: string;
      numberOfPosts: string;
      timeStamps?: string;
      minPrice?: string;
      maxPrice?: string;
    };
  }>('/posts', async (request, reply) => {
    try {
      const { groupsIds, numberOfPosts, timeStamps, maxPrice, minPrice } =
        request.query || {};
      const cacheKey = `${groupsIds}${numberOfPosts}${timeStamps}${minPrice}${maxPrice}`;
      const cachedPosts: Posts | undefined = nodeCache.get(cacheKey);

      if (cachedPosts) {
        return cachedPosts;
      }

      const normalizedGroupsIds = groupsIds.split(',');
      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      const postsByGroup = Number(numberOfPosts) / normalizedGroupsIds.length;
      const posts = await Promise.all(
        normalizedGroupsIds.map(groupId =>
          parseFacebookGroups(groupId, postsByGroup),
        ),
      );

      let normalizedPosts = posts
        .flat()
        .sort((a, b) => b.timestamp - a.timestamp);

      if (normalizedTimeStamps) {
        const [from, to] = normalizedTimeStamps;
        normalizedPosts = normalizedPosts.filter(
          ({ timestamp }) => timestamp >= from && timestamp <= to,
        );
      }

      if (minPrice || maxPrice) {
        normalizedPosts = normalizedPosts.filter(({ price }) => {
          let priceMoreThanMin = true;
          if (minPrice) {
            priceMoreThanMin = Number(price) >= Number(minPrice);
          }

          let priceLessThanMax = true;
          if (maxPrice) {
            priceLessThanMax = Number(price) <= Number(maxPrice);
          }

          return priceMoreThanMin || priceLessThanMax;
        });
      }

      nodeCache.set(cacheKey, normalizedPosts);

      return normalizedPosts;
    } catch (err) {
      console.log(err);
    }
  });
};
