import styled, { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import Header from './components/header';
import Footer from './components/footer';
import React from 'react';
import Workspace from './components/workspace';
import { StatusContextProvider } from './contexts/status';
import { ServerSentEventListener } from '~api/subscriber';
import 'react-tippy/dist/tippy.css';

const studioServicesBaseUrl = 'http://localhost:3030/api/v0/streams';

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
        <ServerSentEventListener baseUrl={studioServicesBaseUrl}>
          <Header />
          <Main>
            <Workspace />
          </Main>
          <Footer />
        </ServerSentEventListener>
      </StatusContextProvider>
    </ThemeProvider>
  );
}

export default App;
