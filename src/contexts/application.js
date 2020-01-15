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
      app: {
        name,
        provider,
        region
      }
    };
  };

  const save = function() {
    window.localStorage.setItem(
      'application-context',
      JSON.stringify({
        name,
        provider,
        region
      })
    );
  };

  const load = function() {
    const val = window.localStorage.getItem('application-context');
    if (val) {
      const deser = JSON.parse(val);
      setName(deser.name);
      setProvider(deser.provider);
      setRegion(deser.region);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        state,
        actions,
        pack,
        save,
        load
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
