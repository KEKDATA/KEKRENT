import { css } from '@emotion/css';
import { Image, Typography } from 'antd';
import { FazwazType } from 'contracts/fazwaz/contract';
import React from 'react';

const { Link } = Typography;

const contactsStyle = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const contactStyle = css`
  width: 100%;
  margin-bottom: 8px;
`;

const contactLinkStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const contactImageStyle = css`
  width: 20px !important;
  margin-right: 8px;
`;

export const Contacts = ({
  contacts,
}: {
  contacts: FazwazType['contacts'];
}) => {
  return (
    <ul className={contactsStyle}>
      {contacts.map((contact) => (
        <li key={contact.text} className={contactStyle}>
          <Link
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className={contactLinkStyle}
          >
            <Image
              preview={false}
              src={contact.image}
              loading="lazy"
              className={contactImageStyle}
            />
            {contact.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
