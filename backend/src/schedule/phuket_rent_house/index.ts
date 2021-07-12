import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { CacheKeys } from '../../constants/cache_keys';
import { CacheTime } from '../../constants/cache_time';
import { getParsedPhuketRentHouse } from '../../parser/phuket_rent_house';

export const schedulePhuketRentHouseRent = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 4;
  rule.minute = 40;

  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse phuket rent house ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    const parsed = await getParsedPhuketRentHouse({ countOfSearchItems: 90 });

    set(CacheKeys.PhuketRentHouse, parsed, CacheTime.PhuketRentHouse);
  });
};
