import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Header from './components/header';
import Footer from './components/footer';
import React from 'react';
import Workspace from './components/workspace';
import { StatusContextProvider } from './contexts/status';
import 'react-tippy/dist/tippy.css';

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusContextProvider>
        <Header />
        <Main>
          <Workspace />
        </Main>
        <Footer />
      </StatusContextProvider>
    </ThemeProvider>
  );
}

export default App;
