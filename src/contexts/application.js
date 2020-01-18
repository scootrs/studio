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
  const [name, setName] = useState({
    value: '',
    error: 'App name is required'
  });
  const [provider, setProvider] = useState({
    value: '',
    error: 'Provider is required'
  });
  const [region, setRegion] = useState({
    value: '',
    error: 'Region is required'
  });

  const state = {
    provider,
    name,
    region
  };

  const actions = {
    setProvider: function(value, error = '') {
      setProvider({ value, error });
    },
    setName: function(value, error = '') {
      setName({ value, error });
    },
    setRegion: function(value, error = '') {
      setRegion({ value, error });
    }
  };

  const pack = function() {
    const pkg = {};

    if (!name.error) {
      pkg.name = name.value;
    } else {
      return { package: null, error: name.error };
    }

    if (!provider.error) {
      pkg.provider = provider.value;
    } else {
      return { package: null, error: provider.error };
    }

    if (!region.error) {
      pkg.region = region.value;
    } else {
      return { package: null, error: region.error };
    }

    return { package: pkg, error: null };
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
