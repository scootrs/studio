import React from 'react';
import View from './view';
import { BlueprintContextProvider } from './context';
import { DetailsPaneContextProvider } from './details-pane/context';
import Blueprint from './blueprint';
import DetailsPane from './details-pane';

function LiveBlueprint() {
  return (
    <BlueprintContextProvider>
      <View>
        <Blueprint />
        <DetailsPaneContextProvider>
          <DetailsPane />
        </DetailsPaneContextProvider>
      </View>
    </BlueprintContextProvider>
  );
}

export default LiveBlueprint;
