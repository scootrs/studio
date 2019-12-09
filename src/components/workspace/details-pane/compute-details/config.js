import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useWorkspaceContext from '~components/workspace/context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ComputeConfigDetailsPane() {
  const {
    selected: { config },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  return (
    <ViewRoot>
      <TextInput label={'ID'} value={config.id} onChange={ev => setSelectedObjectConfig({ id: ev.target.value })} />
      <Select
        label={'Runtime'}
        value={config.runtime}
        onChange={ev => setSelectedObjectConfig({ runtime: ev.target.value })}
      >
        <Option value={''}>Select Runtime</Option>
        <Option value={'nodejs@12.x'}>Node.js | 12.x</Option>
      </Select>
    </ViewRoot>
  );
}
