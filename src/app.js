import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme';
import Header from './components/header';
import UtilityPane from './components/utility-pane';
import React from 'react';
import LiveBlueprint from './components/live-blueprint';
import Split from 'react-split';

const SplitAppContent = styled(Split)`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: stretch;
  overflow: auto;
`;

const splitStyler = (dimension, size, gutterSize) => ({
  'flex-basis': `calc(${size}% - ${gutterSize}px)`
});

const gutterStyler = (dimension, gutterSize) => ({
  'flex-basis': `${gutterSize}px`
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SplitAppContent
        sizes={[1, 99]}
        minSize={[60, 500]}
        expandToMin={true}
        cursor={'ew-resize'}
        elementStyle={splitStyler}
        gutterStyle={gutterStyler}
      >
        <UtilityPane />
        <LiveBlueprint />
      </SplitAppContent>
    </ThemeProvider>
  );
}

export default hot(App);
