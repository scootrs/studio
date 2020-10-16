import React from 'react';
import styled from 'styled-components';

import EdaamEditor from 'edaam/EdaamEditor';

import Toolbar from './Toolbar';

const BlueprintViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
`;

export default function Blueprint() {
  return (
    <BlueprintViewRoot>
      <Toolbar />
      <EdaamEditor />
    </BlueprintViewRoot>
  );
}
