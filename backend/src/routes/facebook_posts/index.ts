import { initializedFastify } from '../../config';
import { PostMode, Posts, PostsSettings } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';
import { get, set } from 'node-cache-redis';
import { getFilteredScheduledPosts } from './lib/get_filtered_scheduled_posts';

export const facebookPostsRoute = () => {
  return initializedFastify.get<{
    Querystring: PostsSettings;
  }>('/parse/posts', async request => {
    console.info(`Posts by pid ${process.pid} requested`);

    try {
      const {
        selectedGroupId,
        numberOfPosts,
        timeStamps,
        maxPrice,
        minPrice,
        mode,
        title: groupTitle,
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

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;
      const postsByGroup = Number(numberOfPosts);

      if (mode === PostMode.Faster) {
        const scheduledPosts: Posts = await get(selectedGroupId);

        if (scheduledPosts) {
          const oneOfFilterChosenByUser =
            normalizedTimeStamps || maxPrice || minPrice;
          if (oneOfFilterChosenByUser) {
            return getFilteredScheduledPosts({
              posts: scheduledPosts,
              timeStamps: normalizedTimeStamps,
              maxPrice,
              minPrice,
              groupTitle,
            });
          }

          return scheduledPosts.slice(0, postsByGroup);
        }
      }

      const cachedPosts: Posts | undefined = await get(cacheKey);

      if (cachedPosts) {
        return cachedPosts;
      }

      const actualPosts = await parseFacebookGroups({
        selectedGroupId,
        postsByGroup,
        timeStamps: normalizedTimeStamps,
        minPrice,
        maxPrice,
        groupTitle,
      });

      set(cacheKey, actualPosts, 1800);

      return actualPosts;
    } catch (err) {
      console.log('savePosts', err);
      return [];
    }
  });
};
