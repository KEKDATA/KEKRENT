import { Image, Row, Col, Typography } from 'antd';
import React from 'react';
import { css } from '@emotion/css';
import { FazwazType } from 'contracts/fazwaz/contract';

const { Link, Text } = Typography;

const textStyle = css`
  font-size: 14px;
  text-align: center;
  width: 100%;
  display: block;
`;

const imageStyle = css`
  height: 80px !important;
  width: 150px !important;

  @media screen and (max-width: 400px) {
    width: 120px !important;
    height: 60px !important;
  }
`;

export const ProjectHighlights = ({
  projectHighlights,
}: {
  projectHighlights: FazwazType['projectHighlights'];
}) => {
  return (
    <Row gutter={16} justify="space-around">
      {projectHighlights.map((projectHighlight) => (
        <Col key={projectHighlight.title} span={10}>
          <Link
            href={projectHighlight.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={imageStyle}
              preview={false}
              src={projectHighlight.image}
              loading="lazy"
            />
            <Text className={textStyle}>{projectHighlight.title}</Text>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
