import React from 'react';
import { Button } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import {
  $priceFilter,
  filterPostsByPriceToggled,
  PriceFilter,
} from 'models/posts_filters/model';
import { useStore } from 'effector-react';
import { $somePartOfPostsLoaded } from '../../models/posts/model';

const Price = () => {
  const filter = useStore($priceFilter);
  let icon: React.ReactNode | undefined;

  switch (filter) {
    case PriceFilter.FromMin: {
      icon = <ArrowUpOutlined />;
      break;
    }

    case PriceFilter.FromMax: {
      icon = <ArrowDownOutlined />;
      break;
    }

    default: {
      icon = <FilterOutlined />;
    }
  }

  return (
    <Button
      type="primary"
      shape="round"
      onClick={filterPostsByPriceToggled}
      icon={icon}
    >
      Price
    </Button>
  );
};

export const PostsFilters = () => {
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  if (!somePartOfPostsLoaded) {
    return null;
  }

  return (
    <div>
      <Price />
    </div>
  );
};
