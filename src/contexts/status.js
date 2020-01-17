import React, { useState, useContext } from 'react';

const StatusContext = React.createContext();

export function useStatusContext() {
  const context = useContext(StatusContext);
  if (context === null) {
    throw new Error(
      'No provider found for StatusContext. You must call `useStatusContext` inside of a `StatusContextProvider`'
    );
  }
  return context;
}

export function StatusContextProvider({ children }) {
  const [state, setState] = useState({
    isWaiting: false,
    statusMessage: ''
  });

  const setWaiting = (value, message = '') => setState({ isWaiting: value, statusMessage: message });

  return (
    <StatusContext.Provider
      value={{
        state,
        actions: {
          setWaiting
        }
      }}
    >
      {children}
    </StatusContext.Provider>
  );
}
