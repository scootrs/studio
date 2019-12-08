import React from 'react';
import View from './view';
import { BlueprintContextProvider } from './context';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';

function LiveBlueprint() {
  return (
    <BlueprintContextProvider>
      <View>
        <Blueprint />
        <DetailsPane />
      </View>
    </BlueprintContextProvider>
  );
}

export default LiveBlueprint;
