import React from 'react';
import { Button, Space } from 'antd';
import { css } from '@emotion/css';
import { FilterOutlined } from '@ant-design/icons';
import { useStore } from 'effector-react';
import { Icons } from 'assets/icons';
import {
  $petsFilter,
  filterFazwazCleared,
  petsFilterToggled,
} from 'models/fazwaz/model';
import { $isMobileScreenType } from 'models/screen_type/model';
import { ClearFilters } from 'features/clear_filters/feature';
import { PetsFilter } from 'typings/pets';

const outlinedStyle = css`
  margin-right: -6px;
  svg {
    width: 15px;
    height: 15px;
  }
`;

const filtersStyle = css`
  margin: 10px 20px 5px 20px;
`;

const petsButtonStyle = css`
  display: flex !important;
  align-items: center;
  width: 90px;
  justify-content: space-around;
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

export const Filters = () => {
  const isMobile = useStore($isMobileScreenType);
  const petsFilter = useStore($petsFilter);

  return (
    <div className={filtersStyle}>
      <Space size={[8, 16]}>
        <Button
          onClick={petsFilterToggled}
          className={petsButtonStyle}
          type="primary"
          shape="round"
          icon={getPetsIcon(petsFilter)}
        >
          {!isMobile && 'Pets'}
        </Button>
        <ClearFilters callback={filterFazwazCleared} />
      </Space>
    </div>
  );
};
