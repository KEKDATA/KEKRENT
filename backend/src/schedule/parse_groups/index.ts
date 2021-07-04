import { parseFacebookGroups } from '../../parser/facebook_groups';
import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { staticListFacebookGroups } from '../../routes/facebook_groups/static_list';
import { CacheTime } from '../../constants/cache_time';

const getAllParsedFacebookGroups = async (selectedGroupId: string) => {
  const posts = await parseFacebookGroups({
    selectedGroupId,
    postsByGroup: 140,
    timeStamps: null,
  });

  const currentDate = new Date();
  console.info(
    `Completed parse group: ${selectedGroupId} by time ${currentDate.getHours()}:${currentDate.getMinutes()}`,
  );

  set(selectedGroupId, posts, CacheTime.Facebook);

  return {
    posts,
    selectedGroupId,
  };
};

export const scheduleParseGroups = () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = 2;
  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse all facebook groups ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    for await (const group of staticListFacebookGroups) {
      const { id } = group;

      try {
        await getAllParsedFacebookGroups(id);
      } catch (err) {
        console.error(err);
      }
    }
  });
};
