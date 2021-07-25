import { css } from '@emotion/css';
import { Card, Typography, Collapse, Divider } from 'antd';
import { PhuketRentHousePostType } from 'contracts/phuket_rent_house/contract';
import { BasicInfo } from 'features/phuket_rent_house/posts/basic_info/component';
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

export const Post = ({ post }: { post: PhuketRentHousePostType }) => {
  return (
    <li className={cardStyles.post}>
      <Card
        title={<CardTitle title={post.title} />}
        extra={<CardExtra href={post.link} isDesktop />}
      >
        <CardExtra isDesktop={false} href={post.link} />
        {post.siteMapLink && (
          <Title level={5}>
            <Link
              href={post.siteMapLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Show location
            </Link>
          </Title>
        )}
        {post.aboutPrices.map((aboutPrice) => (
          <Title level={5} key={aboutPrice}>
            {aboutPrice}
          </Title>
        ))}
        <TruncatedDescription description={post.texts} />
        <CardImages images={post.photosLinks} />
        <Collapse className={collapseStyle} ghost>
          {post.basicInfoFirst && (
            <Panel
              header={post.basicInfoFirst.title}
              key={post.basicInfoFirst.title}
            >
              <BasicInfo
                numberOptions={post.basicInfoFirst.numberOptions}
                booleanOptions={post.basicInfoFirst.booleanOptions}
              />
            </Panel>
          )}
          {post.basicInfoLast && (
            <Panel
              header={post.basicInfoLast.title}
              key={post.basicInfoLast.title}
            >
              <BasicInfo
                numberOptions={post.basicInfoLast.numberOptions}
                booleanOptions={post.basicInfoLast.booleanOptions}
              />
            </Panel>
          )}
        </Collapse>
      </Card>
      <Divider />
    </li>
  );
};
