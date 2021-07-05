import { DatePicker, Space } from 'antd';
import { groupSettingsEvents } from 'models/facebook/group_settings/model';
import React from 'react';

const { RangePicker } = DatePicker;

export const Dates = ({ id }: { id: string }) => {
  const handleSelectRange = (_: unknown, timeString: Array<string>) => {
    const timeStamps = timeString.map((time) => {
      const date = new Date(time);
      return date.getTime();
    });
    groupSettingsEvents.timeStampsChanged({ id, timeStamps });
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker showTime onChange={handleSelectRange} />
    </Space>
  );
};
