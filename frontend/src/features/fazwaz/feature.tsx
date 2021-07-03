import React, { useState } from 'react';
import { Button, Card, Divider, Image, Typography } from 'antd';
import { useList } from 'effector-react';
import TruncateMarkup from 'react-truncate-markup';
import { $fazwaz } from 'models/fazwaz/model';
import { cardStyles } from 'ui/card/styles';

const { Title, Link } = Typography;

const Description = ({ description }: { description: string }) => {
  const [isShowMore, setShowMoreStatus] = useState(false);

  const handleShowMore = () => setShowMoreStatus(true);

  if (isShowMore) {
    return <span>{description}</span>;
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
      <span>{description}</span>
    </TruncateMarkup>
  );
};

export const Fazwaz = () => {
  return (
    <ul className={cardStyles.list}>
      {useList($fazwaz, (fazwazPost) => {
        return (
          <li key={fazwazPost.id}>
            <Card
              title={
                <Title className={cardStyles.postTitle} level={3}>
                  {fazwazPost.title}
                </Title>
              }
              extra={
                <Button
                  className={cardStyles.openPost}
                  data-desktop="true"
                  type="link"
                  href={fazwazPost.link}
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
                href={fazwazPost.link}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
              >
                Open post
              </Button>
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
              <Description description={fazwazPost.description} />
              <div className={cardStyles.images}>
                {fazwazPost.photos.map((photo) => (
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
              <div>
                {fazwazPost.basicInforms.map((basicInfo) => (
                  <div key={basicInfo.topic}>
                    <div>{basicInfo.topic}</div>
                    <div>{basicInfo.info}</div>
                  </div>
                ))}
              </div>
              <div>
                {fazwazPost.features.map((feature) => (
                  <div key={feature.text}>
                    <img
                      src={feature.image}
                      loading="lazy"
                      alt={feature.text}
                    />
                    <div>{feature.text}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Divider />
          </li>
        );
      })}
    </ul>
  );
};
