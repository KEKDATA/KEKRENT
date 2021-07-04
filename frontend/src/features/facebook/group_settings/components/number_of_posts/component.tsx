import React from 'react';
import { InputNumber, Row } from 'antd';

import { groupSettingsEvents } from 'models/facebook/group_settings/model';

export const NumberOfPosts = ({
  id,
  numberOfPosts,
}: {
  id: string;
  numberOfPosts: number | null;
}) => {
  const handleChange = (numberOfPosts: number) => {
    groupSettingsEvents.numberOfPostsChanged({ id, numberOfPosts });
  };

  return (
    <Row>
      <InputNumber
        style={{ width: '100%' }}
        placeholder="Number of posts (default: 20)"
        value={numberOfPosts || undefined}
        min={1}
        max={140}
        onChange={handleChange}
      />
    </Row>
  );
};
