import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { useStore } from 'effector-react';
import { $isMobileScreenType } from 'models/screen_type/model';
import React from 'react';
import { FilterName } from 'typings/filter_name';
import { PostsFilter } from 'typings/posts_filters';

const getIcon = (filter: PostsFilter | null) => {
  switch (filter) {
    case PostsFilter.FromMin: {
      return <ArrowUpOutlined />;
    }

    case PostsFilter.FromMax: {
      return <ArrowDownOutlined />;
    }

    default: {
      return <FilterOutlined />;
    }
  }
};

const getMobileIcon = (filterName: FilterName) => {
  const isPrice = filterName === FilterName.Price;
  const isDate = filterName === FilterName.Date;

  switch (true) {
    case isPrice: {
      return <DollarCircleOutlined />;
    }

    case isDate: {
      return <CalendarOutlined />;
    }

    default: {
      return null;
    }
  }
};

export const Filter = ({
  filter,
  onClick,
  name,
}: {
  filter: PostsFilter | null;
  onClick: () => void;
  name: FilterName;
}) => {
  const isMobile = useStore($isMobileScreenType);

  return (
    <Button
      type="primary"
      shape="round"
      onClick={onClick}
      icon={getIcon(filter)}
    >
      {isMobile && getMobileIcon(name)}
      {!isMobile && name}
    </Button>
  );
};
