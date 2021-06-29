import React from 'react';
import { Button, Space } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClearOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import {
  $dateFilter,
  $priceFilter,
  filterPostsByDateToggled,
  filterPostsByPriceToggled,
  filterPostsCleared,
  PostsFilter,
} from 'models/posts_filters/model';
import { useStore } from 'effector-react';
import { $somePartOfPostsLoaded } from '../../models/posts/model';
import { css } from '@emotion/css';

const style = css`
  margin: 0 20px 20px 20px;
`;

const Filter = ({
  filter,
  onClick,
  name,
}: {
  filter: PostsFilter | null;
  onClick: () => void;
  name: string;
}) => {
  let icon: React.ReactNode | undefined;

  switch (filter) {
    case PostsFilter.FromMin: {
      icon = <ArrowUpOutlined />;
      break;
    }

    case PostsFilter.FromMax: {
      icon = <ArrowDownOutlined />;
      break;
    }

    default: {
      icon = <FilterOutlined />;
    }
  }

  return (
    <Button type="primary" shape="round" onClick={onClick} icon={icon}>
      {name}
    </Button>
  );
};

export const PostsFilters = () => {
  const somePartOfPostsLoaded = useStore($somePartOfPostsLoaded);

  const priceFilter = useStore($priceFilter);
  const dateFilter = useStore($dateFilter);

  if (!somePartOfPostsLoaded) {
    return null;
  }

  return (
    <Space size={[8, -16]} wrap className={style}>
      <Filter
        filter={priceFilter}
        onClick={filterPostsByPriceToggled}
        name="Price"
      />
      <Filter
        filter={dateFilter}
        onClick={filterPostsByDateToggled}
        name="Date"
      />
      <Button
        type="primary"
        shape="round"
        onClick={filterPostsCleared}
        icon={<ClearOutlined />}
      >
        Clear filters
      </Button>
    </Space>
  );
};
