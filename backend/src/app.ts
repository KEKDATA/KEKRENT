import fastifyCors from 'fastify-cors';
import fastifyCompress from 'fastify-compress';
import { initializedFastify } from './config';
import { facebookPosts } from './routes/facebook_posts';
import { facebookGroups } from './routes/facebook_groups';
import zlib from 'zlib';

initializedFastify.register(fastifyCors);
initializedFastify.register(fastifyCompress, {
  threshold: 2048,
  encodings: ['gzip', 'deflate'],
  brotliOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT, // useful for APIs that primarily return text
      [zlib.constants.BROTLI_PARAM_QUALITY]: 6, // default is 11, max is 11, min is 0
    },
  },
  zlibOptions: {
    level: 9, // default is 9, max is 9, min is 0
  },
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
