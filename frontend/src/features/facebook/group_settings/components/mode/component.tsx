import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import { groupSettingsEvents } from 'models/group_settings/model';
import { Modes } from 'typings/groups';

export const Mode = ({ id }: { id: string }) => {
  const handleChangeGroupSettings = (event: RadioChangeEvent) => {
    const { value } = event.target;
    groupSettingsEvents.modeChanged({ id, mode: value });
  };

  return (
    <Radio.Group
      defaultValue={Modes.Faster}
      buttonStyle="solid"
      onChange={handleChangeGroupSettings}
    >
      <Radio.Button value={Modes.Slowpoke}>Slowpoke</Radio.Button>
      <Radio.Button value={Modes.Faster}>Faster</Radio.Button>
    </Radio.Group>
  );
};
