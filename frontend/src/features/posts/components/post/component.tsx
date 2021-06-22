import { Button, Card, Modal } from 'antd';
import React, { useState } from 'react';
import { css } from '@emotion/css';
import { Typography } from 'antd';
// @ts-ignore
import ImageGallery from 'react-image-gallery';

import { PostType } from 'contracts/posts/contract';

const postStyle = css`
  background-color: white;
  padding: 12px;
  cursor: initial !important;
`;

const imageStyle = css`
  width: 300px;
  height: 200px;
`;

const imageContainerStyle = css`
  width: auto;
`;

const imagesStyle = css`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

const listStyle = css`
  padding: 0;
  margin: 4px 0;
`;

const openPostStyle = css`
  &[data-desktop='false'] {
    display: none !important;
  }

  @media screen and (max-width: 720px) {
    &[data-desktop='true'] {
      display: none !important;
    }

    &[data-desktop='false'] {
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin-top: -12px;
    }
  }
`;

const postTitleStyle = css`
  white-space: break-spaces;

  @media screen and (max-width: 720px) {
    font-size: 22px !important;
  }
`;

const modalStyle = css`
  .ant-modal-close {
    right: -15px;
    top: -15px;
  }
`;

const { Title, Link } = Typography;

export const Post = ({ post }: { post: PostType }) => {
  const [isGalleryVisible, setGalleryVisibleStatus] = useState(false);

  const showModal = () => {
    setGalleryVisibleStatus(true);
  };

  const handleCancel = () => {
    setGalleryVisibleStatus(false);
  };

  const normalizedPhotos = post.photos.map((photo) => ({
    original: photo,
    thumbnail: photo,
  }));

  return (
    <>
      <Card
        hoverable
        className={postStyle}
        title={
          <Title className={postTitleStyle} level={2}>
            {post.title}
          </Title>
        }
        extra={
          <Button
            className={openPostStyle}
            data-desktop="true"
            type="link"
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            Open post
          </Button>
        }
      >
        {post.publishDate && <Title level={3}>{post.publishDate}</Title>}
        <Button
          className={openPostStyle}
          data-desktop="false"
          type="link"
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
        >
          Open post
        </Button>
        <Title level={5}>
          <Link
            href={`https://www.google.ru/maps/place/${post.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Location: {post.address}
          </Link>
        </Title>
        <Title level={5}>{post.price}</Title>
        <div className={listStyle}>
          {post.description.map((partOfDescription) => (
            <Typography key={partOfDescription}>{partOfDescription}</Typography>
          ))}
        </div>
        <div className={imagesStyle} onClick={showModal}>
          {post.photos.map((photo) => (
            <div key={photo} className={imageContainerStyle}>
              <img
                className={imageStyle}
                loading="lazy"
                src={photo}
                alt="some photo"
              />
            </div>
          ))}
        </div>
      </Card>
      <Modal
        className={modalStyle}
        visible={isGalleryVisible}
        onCancel={handleCancel}
        closable
        footer={null}
      >
        <ImageGallery items={normalizedPhotos} />
      </Modal>
    </>
  );
};
