import fastify from 'fastify';

export const initializedFastify = fastify({
  keepAliveTimeout: 50000,
  bodyLimit: 4194304,
});
