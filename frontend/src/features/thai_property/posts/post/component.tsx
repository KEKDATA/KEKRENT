import { css } from '@emotion/css';
import { Card, Typography, Collapse, Divider } from 'antd';
import { ThaiPropertyPostType } from 'contracts/thai_property/contract';
import { TruncatedDescription } from 'features/truncated_description/feature';
import React from 'react';
import { CardExtra, CardImages, CardTitle } from 'ui/card';
import { cardStyles } from 'ui/card/styles';

const { Title, Link } = Typography;
const { Panel } = Collapse;

const collapseStyle = css`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export const Post = ({ post }: { post: ThaiPropertyPostType }) => {
  return (
    <li className={cardStyles.post}>
      <Card
        title={<CardTitle title={post.title} />}
        extra={<CardExtra href={post.link} isDesktop />}
      >
        <CardExtra isDesktop={false} href={post.link} />
        <Title level={5}>
          <Link href={post.location} target="_blank" rel="noopener noreferrer">
            Show location
          </Link>
        </Title>
        {post.linkToRequestDetails && (
          <Link
            href={post.linkToRequestDetails}
            target="_blank"
            rel="noopener noreferrer"
          >
            Request details
          </Link>
        )}
        <Title level={5}>{post.priceTitle}</Title>
        <TruncatedDescription description={post.descriptions} />
        <CardImages images={post.imagesLinks} />
        <Collapse className={collapseStyle} ghost>
          <Panel header="Features" key="features">
            {post.features.map(({ name, value }) => (
              <>
                <span>{name}</span>
                <span>{value}</span>
              </>
            ))}
          </Panel>
          <Panel header="Facility" key="facility">
            {post.facilities.map((facility) => (
              <span>{facility}</span>
            ))}
          </Panel>
        </Collapse>
      </Card>
      <Divider />
    </li>
  );
};
