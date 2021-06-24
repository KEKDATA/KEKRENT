// @ts-ignore
import ObjectsToCsv from 'objects-to-csv';
import { asyncGenerator } from '../lib/generators/async_generator';
import { staticListFacebookGroups } from '../routes/facebook_groups/static_list';
import csvtojson from 'csvtojson';
import fetch from 'undici-fetch';

export const generatePredicatedPosts = async () => {
  const descriptions: string[] = [];

  for await (const num of asyncGenerator(staticListFacebookGroups.length)) {
    const group = staticListFacebookGroups[num];
    const csvFilePath = `./list-${group.id}.csv`;

    try {
      const descriptionsByGroup = await csvtojson().fromFile(csvFilePath);

      descriptions.push(
        ...descriptionsByGroup.map(({ description }) =>
          // REMOVE THAI!!1
          // eslint-disable-next-line no-control-regex
          description.replace(/[\u{0080}-\u{FFFF}]/gu, ''),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  }

  const uniqDescriptions = [...new Set(descriptions)];

  const predicted = [];

  for await (const num of asyncGenerator(uniqDescriptions.length)) {
    const description = uniqDescriptions[num];

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

  const csv = new ObjectsToCsv(predicted);

  await csv.toDisk(`./list.csv`);
};
