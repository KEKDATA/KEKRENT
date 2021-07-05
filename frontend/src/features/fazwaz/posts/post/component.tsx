import { css } from '@emotion/css';
import { Card, Collapse, Divider, Typography } from 'antd';
import { FazwazType } from 'contracts/fazwaz/contract';
import { BasicInforms } from 'features/fazwaz/posts/basic_informs/component';
import { Contacts } from 'features/fazwaz/posts/contacts/component';
import { Description } from 'features/fazwaz/posts/description/component';
import { Pets } from 'features/fazwaz/posts/pets/component';
import { PostFeatures } from 'features/fazwaz/posts/post_features/component';
import { ProjectHighlights } from 'features/fazwaz/posts/project_highlights/component';
import React from 'react';
import { cardStyles } from 'ui/card/styles';
import { CardExtra, CardImages, CardTitle } from 'ui/card/ui';

const { Title, Link } = Typography;
const { Panel } = Collapse;

const collapseStyle = css`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export const Post = ({ fazwazPost }: { fazwazPost: FazwazType }) => {
  return (
    <li className={cardStyles.post}>
      <Card
        title={<CardTitle title={fazwazPost.title} />}
        extra={<CardExtra isDesktop href={fazwazPost.link} />}
      >
        <Pets petsInfo={fazwazPost.petsInfo} />
        <CardExtra isDesktop={false} href={fazwazPost.link} />
        <Title level={5}>
          <Link
            href={`https://www.google.ru/maps/place/${fazwazPost.location}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Location: {fazwazPost.location}
          </Link>
        </Title>
        <Title level={5}>{fazwazPost.price}</Title>
        <Title level={5}>{fazwazPost.availableNow}</Title>
        <Description description={fazwazPost.description} />
        <CardImages images={fazwazPost.photos} />
        <Collapse className={collapseStyle} ghost>
          <Panel header="Project highlights" key="projectHighlights">
            <ProjectHighlights
              projectHighlights={fazwazPost.projectHighlights}
            />
          </Panel>
          <Panel header="Features" key="features">
            <PostFeatures features={fazwazPost.features} />
          </Panel>
          <Panel header="Basic Information" key="basicInformation">
            <BasicInforms basicInforms={fazwazPost.basicInforms} />
          </Panel>
          <Panel header="Contacts" key="contacts">
            <Contacts contacts={fazwazPost.contacts} />
          </Panel>
        </Collapse>
      </Card>
      <Divider />
    </li>
  );
};
