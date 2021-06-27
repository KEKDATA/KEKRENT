import { initializedFastify } from '../../config';
import { Posts, PostsSettings } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';
import { get, set } from 'node-cache-redis';
import { getFilteredScheduledPosts } from './lib/get_filtered_scheduled_posts';

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

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      const cachedPosts: Posts | undefined = await get(cacheKey);

      const scheduledPosts = await get(selectedGroupId);

      if (scheduledPosts) {
        const oneOfFilterChosenByUser =
          normalizedTimeStamps || maxPrice || minPrice;
        if (oneOfFilterChosenByUser) {
          return getFilteredScheduledPosts({
            posts: scheduledPosts,
            timeStamps: normalizedTimeStamps,
            maxPrice,
            minPrice,
          });
        }

        return scheduledPosts.slice(0, numberOfPosts);
      }

      const postsByGroup = Number(numberOfPosts);

      if (cachedPosts) {
        return cachedPosts;
      }

      const actualPosts = await parseFacebookGroups({
        selectedGroupId,
        postsByGroup,
        timeStamps: normalizedTimeStamps,
        minPrice,
        maxPrice,
      });

      set(cacheKey, actualPosts);

      return actualPosts;
    } catch (err) {
      console.log('savePosts', err);
      return [];
    }
  });
};
