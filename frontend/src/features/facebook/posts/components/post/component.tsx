import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import { FacebookPostType } from 'contracts/facebook_posts/contract';
import { TruncatedDescription } from 'features/truncated_description/feature';
import React from 'react';
import { CardExtra, CardImages, CardTitle } from 'ui/card';

const postStyle = css`
  cursor: initial !important;
`;

const { Title, Link } = Typography;

export const Post = ({ post }: { post: FacebookPostType }) => {
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
      <TruncatedDescription description={post.description} />
      <CardImages images={post.photos} />
    </Card>
  );
};
