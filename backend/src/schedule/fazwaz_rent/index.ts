import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { getParsedFazwazRent } from '../../parser/fazwaz_rent';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';

export const scheduleFazwazRent = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 4;
  rule.minute = 20;

  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse fazwaz rent ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    const parsedPosts = await getParsedFazwazRent({ countOfSearchItems: 90 });

    set(CacheKeys.Fazwaz, parsedPosts, CacheTime.Fazwaz);
  });
};
