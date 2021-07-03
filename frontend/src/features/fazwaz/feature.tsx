import React, { useState } from 'react';
import { Button, Card, Collapse, Divider, Typography } from 'antd';
import { useList } from 'effector-react';
import TruncateMarkup from 'react-truncate-markup';
import { css } from '@emotion/css';
import { $fazwaz } from 'models/fazwaz/model';
import { CardExtra, CardImages, CardList, CardTitle } from 'ui/card/ui';
import { cardStyles } from 'ui/card/styles';
import { PostFeatures } from 'features/fazwaz/post_features/component';
import { BasicInforms } from 'features/fazwaz/basic_informs/component';
import { Icons } from 'assets/icons';
import { Pet } from 'features/fazwaz/pets/component';

const { Panel } = Collapse;
const { Title, Link } = Typography;

const collapseStyle = css`
  .ant-collapse-content-box {
    padding: 0 !important;
  }
`;

const Description = ({ description }: { description: string }) => {
  const [isShowMore, setShowMoreStatus] = useState(false);

  const handleShowMore = () => setShowMoreStatus(true);

  if (isShowMore) {
    return <span className={cardStyles.description}>{description}</span>;
  }

  return (
    <TruncateMarkup
      lines={6}
      ellipsis={
        <Button type="text" onClick={handleShowMore}>
          ... Show more
        </Button>
      }
    >
      <span className={cardStyles.description}>{description}</span>
    </TruncateMarkup>
  );
};

export const Fazwaz = () => {
  return (
    <CardList>
      {useList($fazwaz, (fazwazPost) => {
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
                <Panel header="Features" key="1">
                  <PostFeatures features={fazwazPost.features} />
                </Panel>
                <Panel header="Basic Information" key="2">
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
