import { parseFacebookGroups } from '../../parser/facebook_groups';
import { set } from 'node-cache-redis';
import schedule from 'node-schedule';
import { staticListFacebookGroups } from '../../routes/facebook_groups/static_list';

export const scheduleParseGroups = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const nextNearTime = minutes + 1;
  const getAllParsedFacebookGroups = async (selectedGroupId: string) => {
    const posts = await parseFacebookGroups({
      selectedGroupId,
      postsByGroup: 110,
      timeStamps: null,
    });

    const currentDate = new Date();
    console.info(
      `Completed parse group: ${selectedGroupId} by time ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    set(selectedGroupId, posts);

    return {
      posts,
      selectedGroupId,
    };
  };
  schedule.scheduleJob(`${nextNearTime} * * * *`, async () => {
    const currentDate = new Date();
    console.info(
      `Start parse all facebook groups ${currentDate.getHours()}:${currentDate.getMinutes()}`,
    );

    for await (const group of staticListFacebookGroups) {
      const { id } = group;

      await getAllParsedFacebookGroups(id);
    }
  });
};
