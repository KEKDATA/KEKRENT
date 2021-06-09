import { initializedFastify } from '../../config';
import { staticListFacebookGroups } from '../../static/facebook_groups';

export const facebookGroups = () => {
  return initializedFastify.get('/groups', async (request, reply) => {
    reply.send(staticListFacebookGroups);
  });
};
