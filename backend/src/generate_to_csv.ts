// @ts-ignore
import ObjectsToCsv from 'objects-to-csv';

import { parseFacebookGroups } from './parser/facebook_groups';
import fetch from 'undici-fetch';

export const generateToCsv = async () => {
  const posts = await parseFacebookGroups({
    selectedGroupId: 352703484885257,
    postsByGroup: 20,
    timeStamps: null,
  });

  const postsWithPredicted: { content: string; classIndex: number }[] = [];

  for (const post of posts) {
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

  console.log('NICE BOYYYY');

  await csv.toDisk('./list.csv');
};

generateToCsv();
