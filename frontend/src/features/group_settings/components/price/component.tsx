import React from "react";
import { InputNumber } from "antd";
import { css } from "@emotion/css";
import { groupSettingsEvents } from "../../../../models/group_settings/model";

const styles = css`
  width: 125px !important;
`;

const setupMinMaxPrice = (price?: number) => price?.toString() ?? undefined;
const formatter = (value?: string) => (value ? `฿ ${value}` : "");
const parser = (value?: string) => value?.replace(/\$\s?|(฿ ,*)/g, "") ?? "";

export const Price = ({
  id,
  min,
  max,
}: {
  id: string;
  min?: number;
  max?: number;
}) => {
  const handleChangeMinPrice = (value: string) =>
    groupSettingsEvents.minPriceChanged({
      id,
      min: +value,
    });
  const handleChangeMaxPrice = (value: string) =>
    groupSettingsEvents.maxPriceChanged({
      id,
      max: +value,
    });

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

  return (
    <div>
      <InputNumber
        className={styles}
        placeholder="Write min price"
        value={setupMinMaxPrice(min)}
        min="0"
        max={setupMinMaxPrice(max)}
        formatter={formatter}
        parser={minParser}
        onChange={handleChangeMinPrice}
      />
      <InputNumber
        className={styles}
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