import React, { useContext, useState } from 'react';

const DetailsPaneContext = React.createContext({});

const useDetailsPaneContext = () => useContext(DetailsPaneContext);
export default useDetailsPaneContext;

export const DetailsPaneContextProvider = ({ children }) => {
  // All of the major configurable properties are stored as separate state variables so that we can
  // access them

  const [saved, _setSaved] = useState(true);
  const update = setter => c => {
    if (saved) {
      _setSaved(false);
    }
    return setter(c);
  };

  // Studio configuration
  const [objectId, _setObjectId] = useState(null);

  // Configuration Settings that can be edited by the user
  const [config, _setConfig] = useState({});
  const setConfig = update(_setConfig);

  const saveWith = setObjectConfig => {
    setObjectConfig(objectId, { ...config });
    if (!saved) {
      // Set the state to saved
      _setSaved(true);
    }
  };

  const init = (id, config) => {
    _setObjectId(id);
    _setConfig({ ...config });
    return true;
  };

  return (
    <DetailsPaneContext.Provider
      value={{
        objectId,
        saved,
        config,
        actions: {
          init,
          saveWith,
          setConfig
        }
      }}
    >
      {children}
    </DetailsPaneContext.Provider>
  );
};
