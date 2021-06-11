import React from "react";
import { InputNumber } from "antd";
import {
  $price,
  maxPriceChanged,
  minPriceChanged,
} from "../../../../models/posts/model";
import { useStore } from "effector-react";

const handleChangeMinPrice = (value: string) => minPriceChanged(+value);
const handleChangeMaxPrice = (value: string) => maxPriceChanged(+value);

const formatter = (value?: string) => (value ? `฿ ${value}` : "");

const parser = (value?: string) => value?.replace(/\$\s?|(฿ ,*)/g, "") ?? "";
const minParser = (value?: string) => {
  const parsedValue = parser(value);

  handleChangeMinPrice(parsedValue);

  return parsedValue;
};
const maxParser = (value?: string) => {
  const parsedValue = parser(value);

  handleChangeMaxPrice(parsedValue);

  return parsedValue;
};

const setupMinMaxPrice = (price?: number) => price?.toString() ?? undefined;

export const Price = () => {
  const { min, max } = useStore($price);

  return (
    <div>
      <InputNumber
        placeholder="Write min price"
        value={setupMinMaxPrice(min)}
        min="0"
        max={setupMinMaxPrice(max)}
        formatter={formatter}
        parser={minParser}
        onChange={handleChangeMinPrice}
      />
      <InputNumber
        placeholder="Write max price"
        value={setupMinMaxPrice(max)}
        min={setupMinMaxPrice(min)}
        formatter={formatter}
        parser={maxParser}
        onChange={handleChangeMaxPrice}
      />
    </div>
  );
};
