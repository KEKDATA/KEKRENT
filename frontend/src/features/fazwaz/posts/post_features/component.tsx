import { css } from '@emotion/css';
import { Tooltip } from 'antd';
import { FazwazType } from 'contracts/fazwaz/contract';
import { useStore } from 'effector-react';
import { $isMobileScreenType } from 'models/screen_type/model';
import React from 'react';

const featuresStyles = css`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

const featureStyle = css`
  text-align: center;
  width: 120px;
  margin-bottom: 12px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 48%;
    text-align: left;
    &:nth-child(1n) {
      margin-right: 4px;
    }
  }
`;

const imageStyle = css`
  margin-bottom: 4px;
  width: 40px;

  @media screen and (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
`;

export const PostFeatures = ({
  features,
}: {
  features: FazwazType['features'];
}) => {
  const isMobile = useStore($isMobileScreenType);
  return (
    <ul className={featuresStyles}>
      {features.map((feature) => (
        <li key={feature.text} className={featureStyle}>
          {!isMobile && (
            <Tooltip title={feature.text}>
              <img
                className={imageStyle}
                src={feature.image}
                loading="lazy"
                alt={feature.text}
              />
            </Tooltip>
          )}
          {isMobile && (
            <>
              <img
                className={imageStyle}
                src={feature.image}
                loading="lazy"
                alt={feature.text}
              />
              <span>{feature.text}</span>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
