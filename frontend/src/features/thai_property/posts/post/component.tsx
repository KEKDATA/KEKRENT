import { css } from '@emotion/css';
import { Card, Typography, Collapse, Divider, Row, Col } from 'antd';
import { ThaiPropertyPostType } from 'contracts/thai_property/contract';
import { TruncatedDescription } from 'features/truncated_description/feature';
import React from 'react';
import { CardExtra, CardImages, CardTitle } from 'ui/card';
import { cardStyles } from 'ui/card/styles';

const { Title, Link, Text } = Typography;
const { Panel } = Collapse;

const collapseStyle = css`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const textStyle = css`
  font-size: 15px;
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
            <Row gutter={[16, 8]} justify="space-around">
              {post.features.map(({ name, value }) => (
                <Col key={name} span={22}>
                  <Text className={textStyle}>{name}: </Text>
                  <Text className={textStyle}>{value}</Text>
                </Col>
              ))}
            </Row>
          </Panel>
          <Panel header="Facility" key="facility">
            <Row gutter={[16, 8]} justify="space-around">
              {post.facilities.map((facility) => (
                <Col key={facility} span={22}>
                  <Text className={textStyle}>{facility}</Text>
                </Col>
              ))}
            </Row>
          </Panel>
        </Collapse>
      </Card>
      <Divider />
    </li>
  );
};
