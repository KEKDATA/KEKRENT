import { privatePass, privatePhone } from '../../../../../private/data';
import { CachedCookies } from '../../../../types/cookies';
import { CacheKeys } from '../../../../constants/cache_keys';
import { BrowserContext } from 'playwright';
import { get, set } from 'node-cache-redis';
import { CacheTime } from '../../../../constants/cache_time';

export const updateUsersCookies = async (context: BrowserContext) => {
  const userCookies = await context.cookies();

  const cookiesKey = `${privatePhone}${privatePass}`;

  const usersCookies: CachedCookies = (await get(CacheKeys.Cookies)) || {};

  usersCookies[cookiesKey] = userCookies.map(cookie => ({
    ...cookie,
    expires: -1,
  }));

  set(CacheKeys.Cookies, usersCookies, CacheTime.Cookies);
};
