import React from "react";
import { $posts, getPostsFx } from "./model";
import { useStore } from "effector-react";
import { Button } from "reakit/Button";
import { css } from "@emotion/css";

const className = css`
  outline: 0;
  color: #ffffff;
  background: #006dff;
  padding: 0.375em 0.75em;
  line-height: 1.5;
  border: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 16px;

  &:focus {
    box-shadow: 0 0 0 0.2em rgba(0, 109, 255, 0.4);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: auto;
    opacity: 0.5;
  }

  &:not([disabled]),
  &:not([aria-disabled="true"]) {
    &:hover {
      color: #ffffff;
      background-color: #0062e6;
    }
    &:active,
    &[data-active="true"] {
      color: #ffffff;
      background-color: #004eb8;
    }
  }
`;

// 796291153803529
// 126101298046115

export const Posts = () => {
  const posts = useStore($posts);

  return (
    <>
      <Button
        className={className}
        onClick={() => getPostsFx([126101298046115, 796291153803529])}
      >
        GET POSTS
      </Button>
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
