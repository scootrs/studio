import React from 'react';

export const initialState = {
  functions: {},
  storage: {}
};

export const onDrop = (curState, setState) => provider =>
  setState({
    ...curState,
    functions: {
      ...curState.functions,
      [provider.id]: provider
    }
  });

const context = React.createContext(initialState);

export default context;
