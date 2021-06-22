import { initializedFastify, nodeCache } from '../../config';
import { Posts, PostsSettings } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';

export const facebookSavePostsRoute = () => {
  return initializedFastify.get<{
    Querystring: PostsSettings;
  }>('/posts', async request => {
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

      if (cachedPosts) {
        return cachedPosts;
      }

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      const posts = await parseFacebookGroups({
        selectedGroupId,
        postsByGroup,
        timeStamps: normalizedTimeStamps,
        minPrice,
        maxPrice,
      });

      nodeCache.set(cacheKey, posts);

      return posts;
    } catch (err) {
      console.log('savePosts', err);
      return [];
    }
  });
};
