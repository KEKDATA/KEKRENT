import { initializedFastify } from '../../config';
import { Posts, PostsSettings } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';
import { get, set } from 'node-cache-redis';

export const facebookSavePostsRoute = () => {
  return initializedFastify.get<{
    Querystring: PostsSettings;
  }>('/posts', async request => {
    console.info(`Posts by pid ${process.pid} requested`);

    try {
      const { selectedGroupId, numberOfPosts, timeStamps, maxPrice, minPrice } =
        request.query || {};
      const cacheKey = [
        selectedGroupId,
        numberOfPosts,
        timeStamps,
        maxPrice,
        minPrice,
      ]
        .filter(Boolean)
        .join(',');
      const cachedPosts: Posts | undefined = await get(cacheKey);

      const postsByGroup = Number(numberOfPosts);

      if (cachedPosts) {
        return cachedPosts;
      }

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      const { posts, isError } = await parseFacebookGroups({
        selectedGroupId,
        postsByGroup,
        timeStamps: normalizedTimeStamps,
        minPrice,
        maxPrice,
      });

      let actualPosts = posts;

      if (isError) {
        const afterError = await parseFacebookGroups({
          selectedGroupId,
          postsByGroup,
          timeStamps: normalizedTimeStamps,
          minPrice,
          maxPrice,
        });

        if (afterError.isError) {
          return [];
        }

        actualPosts = afterError.posts;
      }

      set(cacheKey, actualPosts);

      return actualPosts;
    } catch (err) {
      console.log('savePosts', err);
      return [];
    }
  });
};
