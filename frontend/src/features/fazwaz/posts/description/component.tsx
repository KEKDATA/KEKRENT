import { Button } from 'antd';
import React, { useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { cardStyles } from 'ui/card/styles';

export const Description = ({ description }: { description: string }) => {
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
