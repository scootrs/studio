import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useWorkspaceContext from '~components/workspace/context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function StorageConfigDetailsPane() {
  const {
    selected: { config },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  return (
    <ViewRoot>
      <TextInput label="ID" name="id" value={config.id} onChange={onChange} />
      <TextInput label="Table Name" name="table" value={config.table} onChange={onChange} />
      <TextInput label="Primary Key Name" name="primaryName" value={config.primaryName} onChange={onChange} />
      <Select label={'Primary Key Data Type'} name="primaryType" value={config.primaryType} onChange={onChange}>
        <Option value={''}>Select primary key type</Option>
        <Option value={'S'}>String</Option>
        <Option value={'N'}>Number</Option>
      </Select>
    </ViewRoot>
  );
}
