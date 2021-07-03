import React from 'react';
import { InputNumber, Row } from 'antd';
import { css } from '@emotion/css';
import { groupSettingsEvents } from 'models/group_settings/model';

const style = css`
  width: 125px !important;
`;

const setupMinMaxPrice = (price?: number) => price?.toString() ?? undefined;
const formatter = (value?: string) => (value ? `฿ ${value}` : '');
const parser = (value?: string) =>
  value?.replace(/\$\s?|(฿ ,*)/g, '').replace(/[^0-9.]/g, '') ?? '';
const normalizeChangedValue = (value: string | number) => Number(value);

export const Price = ({
  id,
  min,
  max,
}: {
  id: string;
  min?: number;
  max?: number;
}) => {
  const handleChangeMinPrice = (value: string | number) => {
    if (value) {
      groupSettingsEvents.minPriceChanged({
        id,
        min: normalizeChangedValue(value),
      });
    }
  };
  const handleChangeMaxPrice = (value: string | number) => {
    if (value) {
      groupSettingsEvents.maxPriceChanged({
        id,
        max: normalizeChangedValue(value),
      });
    }
  };

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
    <Row wrap={false}>
      <InputNumber
        className={style}
        placeholder="Min price"
        value={setupMinMaxPrice(min)}
        min="0"
        max={setupMinMaxPrice(max)}
        formatter={formatter}
        parser={minParser}
        onChange={handleChangeMinPrice}
      />
      <InputNumber
        className={style}
        placeholder="Max price"
        value={setupMinMaxPrice(max)}
        min={setupMinMaxPrice(min)}
        formatter={formatter}
        parser={maxParser}
        onChange={handleChangeMaxPrice}
      />
    </Row>
  );
};
