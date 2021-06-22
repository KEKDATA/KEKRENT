import React, { useMemo, useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { Button } from 'antd';
import { css } from '@emotion/css';

const listStyle = css`
  padding: 0;
  margin: 4px 0 10px 0;
`;

const descriptionStyle = css`
  display: block;
`;

export const Description = ({ description }: { description: string[] }) => {
  const [isShowMore, setShowMoreStatus] = useState(false);

  const handleShowMore = () => setShowMoreStatus(true);

  const list = useMemo(
    () => (
      <div className={listStyle}>
        {description.map((partOfDescription, index) => (
          <span
            key={`${partOfDescription}${index}`}
            className={descriptionStyle}
          >
            {partOfDescription}
          </span>
        ))}
      </div>
    ),
    [description],
  );

  if (isShowMore) {
    return list;
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
      {list}
    </TruncateMarkup>
  );
};
