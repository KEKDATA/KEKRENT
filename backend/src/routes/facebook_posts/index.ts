import { initializedFastify, nodeCache } from '../../config';
import { Posts } from '../../types/posts';
import { parseFacebookGroups } from '../../parser/facebook_groups';

export const facebookPosts = () => {
  return initializedFastify.get<{
    Querystring: {
      groupsIds: string;
      numberOfPosts: string;
      timeStamps?: string;
    };
  }>('/posts', async (request, reply) => {
    const { groupsIds, numberOfPosts, timeStamps } = request.query || {};
    const cachedPosts: Posts | undefined = nodeCache.get(
      `${groupsIds}${numberOfPosts}${timeStamps}`,
    );

    if (cachedPosts) {
      reply.send(cachedPosts);
    }

    const normalizedGroupsIds = groupsIds
      .split(',')
      .map(groupId => Number(groupId));
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

    nodeCache.set(`${groupsIds}${numberOfPosts}${timeStamps}`, normalizedPosts);

    reply.send(normalizedPosts);
  });
};
