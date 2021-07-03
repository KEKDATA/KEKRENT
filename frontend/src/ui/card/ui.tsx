import React, { FC } from 'react';
import { Button, Image, Typography } from 'antd';
import { cardStyles } from 'ui/card/styles';

const { Title } = Typography;

export const CardTitle = ({ title }: { title: string }) => (
  <Title className={cardStyles.postTitle} level={4}>
    {title}
  </Title>
);

export const CardExtra = ({
  href,
  isDesktop,
}: {
  href: string;
  isDesktop: boolean;
}) => (
  <Button
    className={cardStyles.openPost}
    data-desktop={isDesktop}
    type="link"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    size="large"
  >
    Open post
  </Button>
);

export const CardImages = ({ images }: { images: string[] }) => (
  <div className={cardStyles.images}>
    {images.map((image) => (
      <div key={image} className={cardStyles.imageContainer}>
        <Image
          className={cardStyles.image}
          loading="lazy"
          src={image}
          alt="some photo"
        />
      </div>
    ))}
  </div>
);

export const CardList: FC<{ dataLoading?: boolean }> = ({
  children,
  dataLoading,
}) => (
  <ul className={cardStyles.list} data-loading={dataLoading}>
    {children}
  </ul>
);
