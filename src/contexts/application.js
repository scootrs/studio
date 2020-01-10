import React, { useContext, useState } from 'react';

const ApplicationContext = React.createContext();

export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      'Failed to get application context: You can only call `useApplicationContext` from inside an ' +
        '`ApplicationContextProvider`. Make sure you have the provider higher up in the component tree.'
    );
  }
  return context;
}

export function ApplicationContextProvider({ children }) {
  const [provider, setProvider] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');

  const state = {
    provider,
    name,
    region
  };

  const actions = {
    setProvider,
    setName,
    setRegion
  };

  const pack = function() {
    return {
      name,
      provider,
      region
    };
  };

  return (
    <ApplicationContext.Provider
      value={{
        state,
        actions,
        pack
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
