import { privatePass, privatePhone } from '../../../../../private/data';
import { CachedCookies } from '../../../../types/cookies';
import { nodeCache } from '../../../../config';
import { CacheKeys } from '../../../../constants/cache_keys';
import { BrowserContext } from 'playwright';

export const updateUsersCookies = async (context: BrowserContext) => {
  const userCookies = await context.cookies();

  const cookiesKey = `${privatePhone}${privatePass}`;

  const usersCookies: CachedCookies = nodeCache.get(CacheKeys.Cookies) || {};

  usersCookies[cookiesKey] = userCookies.map(cookie => ({
    ...cookie,
    expires: -1,
  }));
  nodeCache.set(CacheKeys.Cookies, usersCookies);
};
