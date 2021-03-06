import { ClearFilters } from '../../clear_filters/feature';
import { Filter } from './components/filter/component';
import { PostsBySelectedGroups } from './components/posts_by_selected_groups/component';
import { css } from '@emotion/css';
import { Space } from 'antd';
import { useStore } from 'effector-react';
import { $somePartOfPostsLoaded } from 'models/facebook/posts/model';
import {
  $dateFilter,
  $priceFilter,
  filterPostsByDateToggled,
  filterPostsByPriceToggled,
  filterPostsCleared,
} from 'models/facebook/posts_filters/model';
import React from 'react';
import { FilterName } from 'typings/filter_name';

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
      <ClearFilters callback={filterPostsCleared} />
    </Space>
  );
};
