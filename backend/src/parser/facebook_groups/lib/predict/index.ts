import { Posts } from '../../../../types/posts';
import fetch from 'undici-fetch';

export const getPredictedPosts = async (posts: Posts) => {
  const predictedPosts: Posts = [];

  for (const filteredPost of posts) {
    const res = await fetch(
      `http://127.0.0.1:8000/predict_advertisement?text=${filteredPost.description}`,
      {
        method: 'POST',
      },
    );
    const { classIndex, prob }: { classIndex: number; prob: number } =
      await res.json();

    const successPredicted = classIndex === 1;
    if (successPredicted) {
      predictedPosts.push(filteredPost);
    }
  }

  return predictedPosts;
};
