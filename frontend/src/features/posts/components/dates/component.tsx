import React from "react";
import { DatePicker, Space } from "antd";
import { timeStampsSelected } from "../../../../models/posts/model";

const { RangePicker } = DatePicker;

const handleSelectRange = (_: unknown, timeString: Array<string>) => {
  const timestamps = timeString.map((time) => {
    const date = new Date(time);
    return date.getTime();
  });
  timeStampsSelected(timestamps);
};

export const Dates = () => {
  return (
    <Space direction="vertical" size={12}>
      <RangePicker showTime onChange={handleSelectRange} />
    </Space>
  );
};
