import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Header from './components/header';
import UtilityPane from './components/utility-pane';
import React from 'react';
import LiveBlueprint from './components/live-blueprint';

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <UtilityPane />
        <LiveBlueprint />
      </Main>
    </ThemeProvider>
  );
}

export default hot(App);
