import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { WorkspaceContextProvider } from './contexts/workspace';
import { ApplicationContextProvider } from './contexts/application';

function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
        <ApplicationContextProvider>
          <WorkspaceContextProvider>{children}</WorkspaceContextProvider>
        </ApplicationContextProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
