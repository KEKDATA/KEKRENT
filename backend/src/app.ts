import fastifyCors from 'fastify-cors';
import fastifyCompress from 'fastify-compress';
import { initializedFastify } from './config';
import { facebookPosts } from './routes/facebook_posts';
import { facebookGroups } from './routes/facebook_groups';

initializedFastify.register(fastifyCors);
initializedFastify.register(fastifyCompress, {
  threshold: 2048,
  encodings: ['gzip'],
});

const start = async () => {
  try {
    await initializedFastify.listen(3000);
  } catch (err) {
    initializedFastify.log.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

start();

facebookPosts();
facebookGroups();
