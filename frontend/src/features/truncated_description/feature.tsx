import { css } from '@emotion/css';
import { Button } from 'antd';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import React, { useMemo, useState, Fragment } from 'react';
import TruncateMarkup from 'react-truncate-markup';
import { cardStyles } from 'ui/card/styles';

const descriptionStyle = css`
  display: block;
`;

export const TruncatedDescription = ({
  description,
}: {
  description: string[];
}) => {
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
              {partOfDescription.split(' ').map((string, index) => {
                const isPhoneNumber = aboutSearchedNumber.includes(string);

                let content = <> {string}</>;

                if (isPhoneNumber) {
                  const tel = aboutSearchedNumber.find((phoneNumber) =>
                    string.includes(phoneNumber),
                  );
                  content = (
                    <>
                      {' '}
                      <a href={`tel:${tel}`}>{tel}</a>
                    </>
                  );
                }

                return <Fragment key={`${string}${index}`}>{content}</Fragment>;
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
