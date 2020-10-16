import React from 'react';
import styled from 'styled-components';

import Workspace from './Workspace';

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.fonts.main};
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  overflow: hidden;
`;

function MainLayout() {
  return (
    <Main>
      <Workspace />
    </Main>
  );
}

export default MainLayout;
