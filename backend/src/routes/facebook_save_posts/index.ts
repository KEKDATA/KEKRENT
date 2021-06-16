import { initializedFastify, nodeCache } from '../../config';
import { Posts, PostsSettings } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';

export const facebookSavePostsRoute = () => {
  return initializedFastify.post<{
    Querystring: PostsSettings;
  }>('/savePosts', async (request, reply) => {
    try {
      const {
        id,
        selectedGroupId,
        numberOfPosts,
        timeStamps,
        maxPrice,
        minPrice,
      } = request.query || {};
      const cacheKey = [
        id,
        selectedGroupId,
        numberOfPosts,
        timeStamps,
        maxPrice,
        minPrice,
      ]
        .filter(Boolean)
        .join(',');
      const cachedPosts: Posts | undefined = nodeCache.get(cacheKey);
      const postsByGroup = Number(numberOfPosts);
      const response = { status: 'success', postsByGroup, cacheKey };

      if (cachedPosts) {
        return response;
      }

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      await parseFacebookGroups({
        selectedGroupId,
        postsByGroup,
        timeStamps: normalizedTimeStamps,
        minPrice,
        maxPrice,
        cacheKey,
        reply,
      });
    } catch (err) {
      console.log('savePosts', err);
      return { status: 'failed', postsByGroup: null, cacheKey: null };
    }
  });
};
