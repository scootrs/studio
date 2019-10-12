import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import Header from './components/header';
import UtilityPane from './components/utility-pane';
import DetailsPane from './components/details-pane';
import React from 'react';
import LiveBlueprint from './components/live-blueprint';

const AppContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const AppContentLeft = styled.div`
  height: 100%;
  width: 100%;
  max-width: 300px;
`;

const AppContentRight = styled.div`
  height: 100%;
  width: 100%;
  max-width: 300px;
  align-self: flex-end;
  flex-shrink: 1;
`;

const AppContentMain = styled.div`
  height: 100%;
  flex-grow: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <AppContent>
        <AppContentLeft>
          <UtilityPane />
        </AppContentLeft>
        <AppContentMain>
          <LiveBlueprint />
        </AppContentMain>
        <AppContentRight>
          <DetailsPane />
        </AppContentRight>
      </AppContent>
    </ThemeProvider>
  );
}

export default hot(App);
