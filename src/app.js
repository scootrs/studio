import React from 'react';
import styled from 'styled-components';
import Header from './components/header';
import Footer from './components/footer';
import Workspace from './components/workspace';
import { ServerSentEventListener } from '~api/subscriber';

const studioServicesBaseUrl = 'http://localhost:3030/api/v0/streams';

const Main = styled.main`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-grow: 1;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.fonts.main};
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
`;

function App() {
  return (
    <ServerSentEventListener baseUrl={studioServicesBaseUrl}>
      <Header />
      <Main>
        <Workspace />
      </Main>
      <Footer />
    </ServerSentEventListener>
  );
}

export default App;
