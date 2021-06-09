import NodeCache from 'node-cache';
import fastify from 'fastify';

export const nodeCache = new NodeCache({ stdTTL: 7200, checkperiod: 1200 });
export const initializedFastify = fastify();
