import React from "react";
import { useStore } from "effector-react";

import { $posts } from "../../models/posts/model";

export const Posts = () => {
  const posts = useStore($posts);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h1>{post.title}</h1>
          <span>{post.publishDate}</span>
          <a
            href={`https://www.google.ru/maps/place/${post.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.address}
          </a>
          <p>{post.price}</p>
          <p>{post.description}</p>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            OPEN
          </a>
          <div>
            {post.photos.map((photo) => (
              <div key={photo}>
                <img loading="lazy" src={photo} alt="some photo" />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};
