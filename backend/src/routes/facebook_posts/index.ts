import { initializedFastify, nodeCache } from '../../config';
import { Posts } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';
import { getFilteredPostsBySettings } from '../../parser/facebook_groups/lib/get_filtered_posts_by_settings';

export const facebookPosts = () => {
  return initializedFastify.get<{
    Querystring: {
      id: string;
      selectedGroupId: string;
      numberOfPosts: string;
      timeStamps?: string;
      minPrice?: string;
      maxPrice?: string;
    };
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
      const cacheKey = `${id}${selectedGroupId}${numberOfPosts}${timeStamps}${minPrice}${maxPrice}`;
      const cachedPosts: Posts | undefined = nodeCache.get(cacheKey);

      if (cachedPosts) {
        return cachedPosts;
      }

      const normalizedTimeStamps = timeStamps
        ? timeStamps.split(',').map(timeStamp => Number(timeStamp))
        : null;

      const postsByGroup = Number(numberOfPosts);

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
      console.log(err);
    }
  });
};
