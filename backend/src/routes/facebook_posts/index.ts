import { initializedFastify } from '../../config';
import {
  FacebookPostMode,
  FacebookPosts,
  FacebookPostsSettings,
} from '../../types/facebook';
import { parseFacebookGroups } from '../../parser/facebook_groups';
import { get, set } from 'node-cache-redis';
import { getFilteredScheduledPosts } from './lib/get_filtered_scheduled_posts';
import { CacheTime } from '../../constants/cache_time';

export const facebookPostsRoute = () => {
  return initializedFastify.get<{
    Querystring: FacebookPostsSettings;
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

      if (mode === FacebookPostMode.Faster) {
        const scheduledPosts: FacebookPosts = await get(selectedGroupId);

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

      const cachedPosts: FacebookPosts | undefined = await get(cacheKey);

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

      /**
       * Тут заточенные посты под конкретный тип парсинга,
       * если мы не закешировали во время все посты нужной группы,
       * то кешируем определенный пак на 20 минут
       */
      set(cacheKey, actualPosts, 1200);

      return actualPosts;
    } catch (err) {
      console.log('savePosts', err);
      return [];
    }
  });
};
