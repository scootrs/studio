import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EventConfigDetailsPane() {
  const {
    selected: { config },
    actions: { setSelectedObjectConfig }
  } = useBlueprintContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  return (
    <ViewRoot>
      <TextInput label="ID" id="id" name="id" value={config.id} onChange={onChange} />
      <Select label={'Method'} id="method" name="method" value={config.method} onChange={onChange}>
        <Option value={'GET'}>GET</Option>
        <Option value={'PUT'}>PUT</Option>
        <Option value={'POST'}>POST</Option>
        <Option value={'DELETE'}>DELETE</Option>
      </Select>
      <TextInput label="Path" id="path" name="path" value={config.path} onChange={onChange} />
    </ViewRoot>
  );
}
