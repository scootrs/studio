import React from 'react';
import styled from 'styled-components';
import { TextInput, Select, Option } from '~styles/input';
import useBlueprintContext from '../../context';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ComputeConfigDetailsPane() {
  const { selected, objects } = useBlueprintContext();

  const config = objects[selected].config;

  return (
    <ViewRoot>
      <TextInput label={'ID'} value={config.id} onChange={() => {}} />
      <Select label={'Runtime'}>
        <Option value={'nodejs-12.x'}>Node.js | 12.x</Option>
      </Select>
    </ViewRoot>
  );
}
