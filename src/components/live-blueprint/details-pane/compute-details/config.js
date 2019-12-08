import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ComputeConfigDetailsPane() {
  const {
    selected,
    objects,
    actions: { setObjectConfig }
  } = useBlueprintContext();

  const config = objects[selected].config;

  return (
    <ViewRoot>
      <TextInput label={'ID'} value={config.id} onChange={ev => setObjectConfig(selected, { id: ev.target.value })} />
      <Select
        label={'Runtime'}
        value={config.runtime}
        onChange={ev => setObjectConfig(selected, { runtime: ev.target.value })}
      >
        <Option value={''}>Select Runtime</Option>
        <Option value={'nodejs@12.x'}>Node.js | 12.x</Option>
      </Select>
    </ViewRoot>
  );
}
