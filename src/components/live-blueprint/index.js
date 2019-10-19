import React, { useState } from 'react';
import View from './view';
import LiveBlueprintContext, { initialState, onDrop } from './context';

function LiveBlueprint() {
  const [state, setState] = useState(initialState);
  const handler = onDrop(state, setState);
  return (
    <LiveBlueprintContext.Provider
      value={{
        state,
        onDrop: handler
      }}
    >
      <View />
    </LiveBlueprintContext.Provider>
  );
}

export default LiveBlueprint;
