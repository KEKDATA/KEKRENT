// @ts-ignore
import ObjectsToCsv from 'objects-to-csv';
import { parseFacebookGroups } from '../parser/facebook_groups';
import fetch from 'undici-fetch';
import { staticListFacebookGroups } from '../routes/facebook_groups/static_list';

const generateToCsv = async (id: string) => {
  const actualPosts = await parseFacebookGroups({
    selectedGroupId: id,
    postsByGroup: 1000,
    timeStamps: null,
  });

  const postsWithPredicted: { content: string; classIndex: number }[] = [];

  for (const post of actualPosts) {
    const normalizedDescription = post.description.join(' ');
    const res = await fetch(
      `http://127.0.0.1:8000/predict_advertisement?text=${normalizedDescription}`,
      {
        method: 'POST',
      },
    );
    const { classIndex, prob }: { classIndex: number; prob: number } =
      await res.json();

    postsWithPredicted.push({
      content: normalizedDescription,
      classIndex,
    });
  }

  const csv = new ObjectsToCsv(postsWithPredicted);

  await csv.toDisk(`./list-${id}.csv`);
};

export const generateManyCsv = () => {
  staticListFacebookGroups.forEach(({ id }) => {
    generateToCsv(id);
  });
};
