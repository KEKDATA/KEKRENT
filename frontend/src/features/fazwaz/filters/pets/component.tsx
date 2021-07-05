import { FilterOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button } from 'antd';
import { Icons } from 'assets/icons';
import { useStore } from 'effector-react';
import { $petsFilter, petsFilterToggled } from 'models/fazwaz/model';
import { $isMobileScreenType } from 'models/screen_type/model';
import React from 'react';
import { PetsFilter } from 'typings/pets';

const petsButtonStyle = css`
  display: flex !important;
  align-items: center;
  width: 90px;
  justify-content: space-around;
`;

const outlinedStyle = css`
  @media screen and (min-width: 768px) {
    margin-right: -6px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

const getPetsIcon = (filter: PetsFilter | null) => {
  switch (filter) {
    case PetsFilter.Allowed: {
      return <Icons.Pet width={20} height={20} fill="white" />;
    }

    case PetsFilter.NotAllowed: {
      return <Icons.NoPet width={20} height={20} />;
    }

    default: {
      return <FilterOutlined className={outlinedStyle} />;
    }
  }
};

export const Pets = () => {
  const petsFilter = useStore($petsFilter);
  const isMobile = useStore($isMobileScreenType);

  return (
    <Button
      onClick={petsFilterToggled}
      className={petsButtonStyle}
      type="primary"
      shape="round"
      icon={getPetsIcon(petsFilter)}
    >
      {!isMobile && 'Pets'}
    </Button>
  );
};
