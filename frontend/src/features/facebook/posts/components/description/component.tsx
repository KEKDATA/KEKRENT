import React, { useMemo, useState } from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { Button } from 'antd';
import { css } from '@emotion/css';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import { cardStyles } from 'ui/card/styles';

const descriptionStyle = css`
  display: block;
`;

export const Description = ({ description }: { description: string[] }) => {
  const [isShowMore, setShowMoreStatus] = useState(false);

  const handleShowMore = () => setShowMoreStatus(true);

  const list = useMemo(
    () => (
      <div className={cardStyles.description}>
        {description.map((partOfDescription, index) => {
          const aboutSearchedNumber = findPhoneNumbersInText(
            partOfDescription,
          ).map((searchedNumber) => searchedNumber.number.number.toString());

          return (
            <span
              key={`${partOfDescription}${index}`}
              className={descriptionStyle}
            >
              {partOfDescription.split(' ').map((string) => {
                const isPhoneNumber = aboutSearchedNumber.includes(string);

                if (isPhoneNumber) {
                  const tel = aboutSearchedNumber.find((phoneNumber) =>
                    string.includes(phoneNumber),
                  );
                  return (
                    <>
                      {' '}
                      <a href={`tel:${tel}`}>{tel}</a>
                    </>
                  );
                }

                return <> {string}</>;
              })}
            </span>
          );
        })}
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
