import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function StorageConfigDetailsPane() {
  const {
    selected,
    objects,
    actions: { setObjectConfig }
  } = useBlueprintContext();

  const config = objects[selected].config;

  const onChange = ev => setObjectConfig(selected, { [ev.target.name]: ev.target.value });

  return (
    <ViewRoot>
      <TextInput label="ID" name="id" value={config.id} onChange={onChange} />
      <TextInput label="Table Name" name="table" value={config.table} onChange={onChange} />
      <TextInput label="Primary Key Name" name="primaryName" value={config.primaryName} onChange={onChange} />
      <Select label={'Primary Key Data Type'} name="primaryType" value={config.primaryType} onChange={onChange}>
        <Option value={'S'}>String</Option>
        <Option value={'N'}>Number</Option>
      </Select>
    </ViewRoot>
  );
}
