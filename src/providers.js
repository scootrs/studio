import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { WorkspaceContextProvider } from './contexts/workspace';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <WorkspaceContextProvider>{children}</WorkspaceContextProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
