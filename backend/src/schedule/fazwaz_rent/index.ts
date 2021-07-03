import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { getParsedFazwazRent } from '../../parser/fazwaz_rent';
import { CacheKeys } from '../../constants/cache_keys';

const fourHours = 14400;

export const scheduleFazwazRent = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 4;
  rule.minute = 20;

  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse fazwaz rent ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    const parsedPosts = await getParsedFazwazRent({ countOfSearchItems: 60 });

    set(CacheKeys.Fazwaz, parsedPosts, fourHours);
  });
};
