import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Header from './components/header';
import React from 'react';
import Workspace from './components/workspace';
import 'react-tippy/dist/tippy.css'

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
        <Workspace />
      </Main>
    </ThemeProvider>
  );
}

export default hot(App);
