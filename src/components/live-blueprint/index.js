import React, { useState } from 'react';
import View from './view';
import { initialState, onDropMux, LiveBlueprintContextProvider } from './context';

function LiveBlueprint() {
  const [state, setState] = useState(initialState);
  return (
    <LiveBlueprintContextProvider
      value={{
        state,
        onDrop: onDropMux(setState)
      }}
    >
      <View />
    </LiveBlueprintContextProvider>
  );
}

export default LiveBlueprint;
