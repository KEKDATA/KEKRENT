// @ts-ignore
import ObjectsToCsv from 'objects-to-csv';
import fetch from 'undici-fetch';
import csvtojson from 'csvtojson';

import { parseFacebookGroups } from './parser/facebook_groups';
import { staticListFacebookGroups } from './routes/facebook_groups/static_list';
import { asyncGenerator } from './lib/generators/async_generator';

const generateToCsv = async (id: string, index: number) => {
  const posts = await parseFacebookGroups({
    selectedGroupId: id,
    postsByGroup: 1000,
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

  await csv.toDisk(`./list-${id}.csv`);
};

const generateManyCsv = async () => {
  staticListFacebookGroups.forEach(({ id }, index) => {
    generateToCsv(id, index);
  });
};

const generateJsonObjFromCsv = async () => {
  const descriptions = [];

  for await (const num of asyncGenerator(staticListFacebookGroups.length)) {
    const group = staticListFacebookGroups[num];
    const csvFilePath = `./list-${group.id}.csv`;

    try {
      const descriptionsByGroup = await csvtojson().fromFile(csvFilePath);

      descriptions.push(...descriptionsByGroup);
    } catch (err) {
      console.log(err);
    }
  }

  const predicted = [];

  for await (const num of asyncGenerator(descriptions.length)) {
    const { description } = descriptions[num];

    const res = await fetch(
      `http://127.0.0.1:8000/predict_advertisement?text=${description}`,
      {
        method: 'POST',
      },
    );
    const { classIndex, prob }: { classIndex: number; prob: number } =
      await res.json();

    predicted.push({
      content: description,
      classIndex,
    });
  }
};

generateJsonObjFromCsv();
