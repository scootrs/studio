import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function StorageConfigDetailsPane() {
  const { selected, objects } = useBlueprintContext();

  const config = objects[selected].config;

  return (
    <ViewRoot>
      <TextInput label="ID" id="id" value={config.id} onChange={() => {}} />
      <TextInput label="Table Name" id="tableName" value={config.table} onChange={() => {}} />
      <TextInput label="Primary Key Name" id="primaryKeyName" value={config.primary.name} onChange={() => {}} />
      <Select label={'Primary Key Data Type'} value={config.primary.type} onChange={() => {}}>
        <Option value={'S'}>String</Option>
        <Option value={'N'}>Number</Option>
      </Select>
    </ViewRoot>
  );
}
