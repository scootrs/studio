import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from './app';
import AppProviders from './providers';
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

render(
  <Provider store={store}>
    <AppProviders>
      <App />
    </AppProviders>
  </Provider>,
  root
);
