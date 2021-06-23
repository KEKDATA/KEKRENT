import { Button, Card, Image } from 'antd';
import React from 'react';
import { css } from '@emotion/css';
import { Typography } from 'antd';

import { PostType } from 'contracts/posts/contract';
import { Description } from '../description/component';

const postStyle = css`
  background-color: white;
  padding: 12px;
  cursor: initial !important;
`;

const imageStyle = css`
  width: 300px !important;
  height: 200px !important;
`;

const imageContainerStyle = css`
  width: auto;
`;

const imagesStyle = css`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const openPostStyle = css`
  &[data-desktop='false'] {
    display: none !important;
  }

  @media screen and (max-width: 720px) {
    &[data-desktop='true'] {
      display: none !important;
    }

    &[data-desktop='false'] {
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin-top: -12px;
    }
  }
`;

const postTitleStyle = css`
  white-space: initial;

  @media screen and (max-width: 720px) {
    font-size: 22px !important;
  }
`;

const { Title, Link } = Typography;

export const Post = ({ post }: { post: PostType }) => {
  return (
    <>
      <Card
        hoverable
        className={postStyle}
        title={
          <Title className={postTitleStyle} level={3}>
            {post.title}
          </Title>
        }
        extra={
          <Button
            className={openPostStyle}
            data-desktop="true"
            type="link"
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            Open post
          </Button>
        }
      >
        {post.publishDate && <Title level={3}>{post.publishDate}</Title>}
        <Button
          className={openPostStyle}
          data-desktop="false"
          type="link"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          Open post
        </Button>
        {post.address && (
          <Title level={5}>
            <Link
              href={`https://www.google.ru/maps/place/${post.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Location: {post.address}
            </Link>
          </Title>
        )}
        <Title level={5}>{post.price}</Title>
        <Description description={post.description} />
        <div className={imagesStyle}>
          {post.photos.map((photo) => (
            <div key={photo} className={imageContainerStyle}>
              <Image
                className={imageStyle}
                loading="lazy"
                src={photo}
                alt="some photo"
              />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};
