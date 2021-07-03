import React from 'react';
import { Space } from 'antd';
import { useStore } from 'effector-react';
import { css } from '@emotion/css';
import {
  $dateFilter,
  $priceFilter,
  filterPostsByDateToggled,
  filterPostsByPriceToggled,
} from 'models/posts_filters/model';
import { $somePartOfPostsLoaded } from 'models/posts/model';
import { FilterName } from 'typings/filter_name';
import { PostsBySelectedGroups } from './components/posts_by_selected_groups/component';
import { Filter } from './components/filter/component';
import { ClearFilters } from './components/clear_filters/component';

const style = css`
  margin: 0 20px 20px 20px;
`;

export const FacebookPostsFilters = () => {
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
        name={FilterName.Price}
      />
      <Filter
        filter={dateFilter}
        onClick={filterPostsByDateToggled}
        name={FilterName.Date}
      />
      <PostsBySelectedGroups />
      <ClearFilters />
    </Space>
  );
};
