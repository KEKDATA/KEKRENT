import { UniqPosts } from '../../../../types/posts';
import fetch from 'undici-fetch';

export const getPredictedPosts = async (posts: UniqPosts) => {
  const predictedPosts: UniqPosts = {};
  const filteredPosts = Object.entries(posts);
  for (const filteredPost of filteredPosts) {
    const stupidId = filteredPost[0];
    const post = filteredPost[1];
    const res = await fetch(
      `http://127.0.0.1:8000/predict_advertisement?text=${
        post.title
      }${post.description.join(' ')}`,
      {
        method: 'POST',
      },
    );
    const { classIndex, prob }: { classIndex: number; prob: number } =
      await res.json();

    const successPredicted = classIndex === 1;
    if (successPredicted) {
      predictedPosts[stupidId] = post;
    }
  }

  return predictedPosts;
};
