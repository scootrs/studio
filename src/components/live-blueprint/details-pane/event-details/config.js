import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EventConfigDetailsPane() {
  const { selected, objects } = useBlueprintContext();

  const config = objects[selected].config;

  return (
    <ViewRoot>
      <TextInput label="ID" id="id" value={config.id} onChange={() => {}} />
      <Select label={'Method'} value={config.method} onChange={() => {}}>
        <Option value={'GET'}>GET</Option>
        <Option value={'PUT'}>PUT</Option>
        <Option value={'POST'}>POST</Option>
        <Option value={'DELETE'}>DELETE</Option>
      </Select>
      <TextInput label="Path" id="path" value={config.path} onChange={() => {}} />
    </ViewRoot>
  );
}
