import { initializedFastify, nodeCache } from '../../config';
import { PartPostsSettings, Posts } from '../../types/posts';

export const facebookPartPosts = () => {
  return initializedFastify.get<{
    Querystring: PartPostsSettings;
  }>('/partPosts', async (request, reply) => {
    try {
      const { cacheKey, from = 0, to = 30, postsByGroup } = request.query || {};
      const cachedPosts: Posts | undefined = nodeCache.get(cacheKey);

      const normalizedValues = {
        from: Number(from),
        to: Number(to),
        postsByGroup: Number(postsByGroup),
      };

      if (!cachedPosts) {
        return [];
      }

      const isInitialPart = from === 0 && to <= 30;
      if (isInitialPart) {
        return cachedPosts.slice(normalizedValues.from, normalizedValues.to);
      }

      const intervalId = setInterval(() => {
        const updatedCachedPosts: Posts | undefined = nodeCache.get(cacheKey);
        if (
          updatedCachedPosts &&
          updatedCachedPosts.length !== cachedPosts.length
        ) {
          reply.send(
            updatedCachedPosts.slice(
              normalizedValues.from,
              normalizedValues.to,
            ),
          );
          clearInterval(intervalId);
        }
      }, 500);
    } catch (err) {
      console.log('partPosts', err);
      return {};
    }
  });
};
