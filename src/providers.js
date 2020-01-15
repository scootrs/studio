import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { StatusContextProvider } from './contexts/status';
import { WorkspaceContextProvider } from './contexts/workspace';
import { ApplicationContextProvider } from './contexts/application';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <StatusContextProvider>
        <ApplicationContextProvider>
          <WorkspaceContextProvider>{children}</WorkspaceContextProvider>
        </ApplicationContextProvider>
      </StatusContextProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
