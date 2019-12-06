import React from 'react';

export const initialState = {
  compute: {},
  storage: {}
};

export const onDrop = (curState, setState) => provider =>
  setState({
    ...curState,
    compute: {
      ...curState.compute,
      [provider.id]: provider
    }
  });

const context = React.createContext(initialState);

export default context;
