import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import Header from 'layouts/Header';
import Main from 'layouts/Main';
import Footer from 'layouts/Footer';

import { ServerSentEventListener } from './api/subscriber';
import theme from './shared/styles/theme';
import { store } from './state';

const root = document.createElement('div');
root.style.display = 'flex';
root.style.flexDirection = 'column';
root.style.alignItems = 'stretch';
root.style.justifyContent = 'flex-start';
root.style.height = '100%';
root.style.width = '100%';
root.style.overflow = 'hidden';
document.body.appendChild(root);

const studioServicesBaseUrl = 'http://localhost:3030/api/v0/streams';

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ServerSentEventListener baseUrl={studioServicesBaseUrl}>
        <Header />
        <Main />
        <Footer />
      </ServerSentEventListener>
    </ThemeProvider>
  </Provider>,
  root
);
