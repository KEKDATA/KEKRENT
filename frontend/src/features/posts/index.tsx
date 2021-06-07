import React from "react";
import { useStore } from "effector-react";

import { $posts } from "./model";
import { Submit } from "./components/submit";
import { NumberOfPosts } from "./components/number_of_posts";
import { Groups } from "./components/groups";

// 796291153803529
// 126101298046115

export const Posts = () => {
  const posts = useStore($posts);

  return (
    <>
      <NumberOfPosts />
      <Groups />
      <Submit />
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
            <ul>
              {post.photos.map((photo) => (
                <li key={photo}>
                  <img src={photo} alt="some photo" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};
