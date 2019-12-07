import React, { useState } from 'react';
import View from './view';
import {
  initialState,
  onDropMux,
  onObjectSelect,
  LiveBlueprintContextProvider,
  onClearSelectedObject
} from './context';

function LiveBlueprint() {
  const [state, setState] = useState(initialState);
  return (
    <LiveBlueprintContextProvider
      value={{
        state,
        onDrop: onDropMux(setState),
        setCurrent: onObjectSelect(setState),
        clearCurrent: onClearSelectedObject(setState)
      }}
    >
      <View />
    </LiveBlueprintContextProvider>
  );
}

export default LiveBlueprint;
