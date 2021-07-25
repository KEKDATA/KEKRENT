import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { getParsedThaiRentProperty } from '../../parser/thai_property';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';

export const scheduleThaiProperty = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 4;
  rule.minute = 55;

  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse thai property ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    const parsed = await getParsedThaiRentProperty({ countOfSearchItems: 90 });

    set(CacheKeys.ThaiProperty, parsed, CacheTime.ThaiProperty);
  });
};
