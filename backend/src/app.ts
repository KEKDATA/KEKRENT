import fastifyCors from 'fastify-cors';
import fastifyCompress from 'fastify-compress';
import zlib from 'zlib';

import { initializedFastify } from './config';
import { facebookPostsRoute } from './routes/facebook_posts';
import { facebookGroupsRoute } from './routes/facebook_groups';
import { init } from 'node-cache-redis';
import { fazwazRentRoute } from './routes/fazwaz_rent';
import { phuketRentHouseRoute } from './routes/phuket_rent_house';

console.info(`Process pid ${process.pid} started...`);

init({
  defaultTtlInS: 3600,
  redisOptions: {
    host: 'localhost',
    port: 6379,
  },
});

initializedFastify.register(fastifyCors, {
  origin: (origin, cb) => {
    if (/localhost/.test(origin)) {
      //  Request from localhost will pass
      cb(null, true);
      return;
    }
    // Generate an error on other origins, disabling access
    cb(new Error('Not allowed'), false);
  },
});
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

facebookPostsRoute();
facebookGroupsRoute();

fazwazRentRoute();

phuketRentHouseRoute();
