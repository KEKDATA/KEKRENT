import NodeCache from 'node-cache';
import fastify from 'fastify';

export const nodeCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
export const initializedFastify = fastify({
  keepAliveTimeout: 50000,
  bodyLimit: 4194304,
});
