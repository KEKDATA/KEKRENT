import React from 'react';
import { Card, Collapse, Divider, Typography } from 'antd';
import { useList } from 'effector-react';
import { css } from '@emotion/css';
import { $fazwazPosts } from 'models/fazwaz/model';
import { CardExtra, CardImages, CardList, CardTitle } from 'ui/card/ui';
import { cardStyles } from 'ui/card/styles';
import { PostFeatures } from 'features/fazwaz/post_features/component';
import { BasicInforms } from 'features/fazwaz/basic_informs/component';
import { Pet } from 'features/fazwaz/pets/component';
import { Description } from 'features/fazwaz/description/component';
import { ProjectHighlights } from 'features/fazwaz/project_highlights/component';

const { Panel } = Collapse;
const { Title, Link } = Typography;

const collapseStyle = css`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

export const Posts = () => {
  return (
    <CardList>
      {useList($fazwazPosts, (fazwazPost) => {
        return (
          <li className={cardStyles.post} key={fazwazPost.id}>
            <Card
              title={<CardTitle title={fazwazPost.title} />}
              extra={<CardExtra isDesktop href={fazwazPost.link} />}
            >
              <Pet petsInfo={fazwazPost.petsInfo} />
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
              </Collapse>
            </Card>
            <Divider />
          </li>
        );
      })}
    </CardList>
  );
};
