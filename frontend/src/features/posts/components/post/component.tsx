import { Button } from 'antd';
import React from 'react';
import { css } from '@emotion/css';

import { PostType } from 'contracts/posts/contract';

const imageStyle = css`
  width: 300px;
  height: 200px;
`;

const imageContainerStyle = css`
  width: auto;
`;

const imagesStyle = css`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0 20px;
`;

export const Post = ({ post }: { post: PostType }) => {
  return (
    <li>
      <h1>{post.title}</h1>
      <span>{post.publishDate}</span>
      <Button
        type="link"
        href={`https://www.google.ru/maps/place/${post.address}`}
        target="_blank"
        rel="noopener noreferrer"
        size="large"
      >
        Location: {post.address}
      </Button>
      <p>{post.price}</p>
      <ul className={listStyle}>
        {post.description.map((partOfDescription) => (
          <li key={partOfDescription}>{partOfDescription}</li>
        ))}
      </ul>
      <Button
        type="link"
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        size="large"
      >
        Open post
      </Button>
      <div className={imagesStyle}>
        {post.photos.map((photo) => (
          <div key={photo} className={imageContainerStyle}>
            <img
              className={imageStyle}
              loading="lazy"
              src={photo}
              alt="some photo"
            />
          </div>
        ))}
      </div>
    </li>
  );
};
