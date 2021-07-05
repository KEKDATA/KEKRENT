import { Description } from '../description/component';
import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { PostType } from 'contracts/posts/contract';
import React from 'react';
import { CardExtra, CardImages, CardTitle } from 'ui/card/ui';

const postStyle = css`
  cursor: initial !important;
`;

const { Title, Link } = Typography;

export const Post = ({ post }: { post: PostType }) => {
  return (
    <Card
      hoverable
      className={postStyle}
      title={<CardTitle title={post.title} />}
      extra={<CardExtra isDesktop href={post.link} />}
    >
      <CardExtra isDesktop={false} href={post.link} />
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
      <CardImages images={post.photos} />
    </Card>
  );
};
