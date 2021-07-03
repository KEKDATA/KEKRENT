import { Button, Card, Image, Typography } from 'antd';
import React from 'react';
import { css } from '@emotion/css';

import { PostType } from 'contracts/posts/contract';
import { cardStyles } from 'ui/card/styles';
import { Description } from '../description/component';

const postStyle = css`
  cursor: initial !important;
`;

const { Title, Link } = Typography;

export const Post = ({ post }: { post: PostType }) => {
  return (
    <Card
      hoverable
      className={postStyle}
      title={
        <Title className={cardStyles.postTitle} level={3}>
          {post.title}
        </Title>
      }
      extra={
        <Button
          className={cardStyles.openPost}
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
      <Button
        className={cardStyles.openPost}
        data-desktop="false"
        type="link"
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        size="large"
      >
        Open post
      </Button>
      {post.publishDate && <Title level={4}>{post.publishDate}</Title>}
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
      <div className={cardStyles.images}>
        {post.photos.map((photo) => (
          <div key={photo} className={cardStyles.imageContainer}>
            <Image
              className={cardStyles.image}
              loading="lazy"
              src={photo}
              alt="some photo"
            />
          </div>
        ))}
      </div>
    </Card>
  );
};
