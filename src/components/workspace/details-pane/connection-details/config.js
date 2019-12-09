import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useWorkspaceContext from '~components/workspace/context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ConnectionConfigDetailsPane() {
  const {
    selected: { config },
    actions: { setSelectedConnectionConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedConnectionConfig({ [ev.target.name]: ev.target.value });

  return (
    <ViewRoot>
      <TextInput label="ID" name="id" value={config.id} onChange={onChange} />
      <Select label={'Allowed Action on Resource'} name="allows" value={config.allows} onChange={onChange}>
        <Option value="">Select permission</Option>
        <Option value={'create'}>Create</Option>
        <Option value={'read'}>Read</Option>
        <Option value={'update'}>Update</Option>
        <Option value={'delete'}>Delete</Option>
        <Option value={'*'}>All</Option>
      </Select>
    </ViewRoot>
  );
}
