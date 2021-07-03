import { initializedFastify } from '../../config';
import { staticListFacebookGroups } from './static_list';

export const facebookGroupsRoute = () => {
  return initializedFastify.get('/parse/groups', async (request, reply) => {
    reply.send(staticListFacebookGroups);
  });
};
