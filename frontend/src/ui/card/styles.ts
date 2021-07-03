import { css } from '@emotion/css';

const images = css`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  max-width: 100vh;
`;

const image = css`
  width: 300px !important;
  height: 200px !important;
`;

const imageContainer = css`
  width: auto;
`;

const list = css`
  list-style: none;
  padding: 0;
  margin: 0 20px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  &[data-loading='true'] {
    display: block;
  }
`;

const postTitle = css`
  white-space: initial;

  @media screen and (max-width: 768px) {
    font-size: 22px !important;
  }
`;

const openPost = css`
  &[data-desktop='false'] {
    display: none !important;
  }

  @media screen and (max-width: 768px) {
    &[data-desktop='true'] {
      display: none !important;
    }

    &[data-desktop='false'] {
      display: flex !important;
      align-items: center;
      justify-content: center;
      margin: -12px 0 0 0;
    }
  }
`;

export const cardStyles = {
  postTitle,
  openPost,
  image,
  images,
  imageContainer,
  list,
};
