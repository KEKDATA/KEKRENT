import { initializedFastify } from '../../config';
import { staticListFacebookGroups } from './static_list';

export const facebookGroupsRoute = () => {
  return initializedFastify.get('/groups', async (request, reply) => {
    reply.send(staticListFacebookGroups);
  });
};
