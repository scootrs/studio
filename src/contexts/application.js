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
  const [state, setState] = useState({
    hasChanges: false,
    isDeployed: false,
    name: {
      value: '',
      error: 'App name is required'
    },
    provider: {
      value: '',
      error: 'Provider is required'
    },
    region: {
      value: '',
      error: 'Region is required'
    }
  });

  const pack = function() {
    const pkg = {};

    if (!state.name.error) {
      pkg.name = state.name.value;
    } else {
      return { package: null, error: state.name.error };
    }

    if (!state.provider.error) {
      pkg.provider = state.provider.value;
    } else {
      return { package: null, error: state.provider.error };
    }

    if (!state.region.error) {
      pkg.region = state.region.value;
    } else {
      return { package: null, error: state.region.error };
    }

    pkg.hasChanges = state.hasChanges;
    pkg.isDeployed = state.isDeployed;

    return { package: pkg, error: null };
  };

  const save = function(s = state) {
    window.localStorage.setItem('application-context', JSON.stringify(s));
  };

  const load = function() {
    const val = window.localStorage.getItem('application-context');
    if (val) {
      const deser = JSON.parse(val);
      setState(deser);
    }
  };

  const actions = {
    setProvider: function(value, error = '') {
      setState(function(prev) {
        return {
          ...prev,
          provider: {
            value,
            error
          },
          hasChanges: true
        };
      });
    },
    setName: function(value, error = '') {
      setState(function(prev) {
        return {
          ...prev,
          name: {
            value,
            error
          },
          hasChanges: true
        };
      });
    },
    setRegion: function(value, error = '') {
      setState(function(prev) {
        return {
          ...prev,
          region: {
            value,
            error
          },
          hasChanges: true
        };
      });
    },
    mergeDeploymentResults: function(results) {
      setState(function(prev) {
        const next = {
          ...prev,
          hasChanges: false,
          isDeployed: true
        };
        save(next);
        return next;
      });
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
