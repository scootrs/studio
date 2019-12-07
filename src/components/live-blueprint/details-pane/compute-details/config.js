import React from 'react';
import styled from 'styled-components';
import { TextInput } from '~styles/input';

const ViewRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function ComputeConfigDetailsPane() {
  return (
    <ViewRoot>
      <TextInput />
    </ViewRoot>
  );
}
