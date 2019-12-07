import React, { useState, useContext } from 'react';

const BlueprintContext = React.createContext({});

const useBlueprintContext = () => useContext(BlueprintContext);
export default useBlueprintContext;

export const BlueprintContextProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);
  const onSelectObject = object => setSelected(object !== null ? object.id : null);

  const [config, setConfig] = useState({});
  const setObjectConfig = (id, newConfig) =>
    setConfig(prev => ({
      ...prev,
      [id]: newConfig
    }));

  const [objects, setObjects] = useState({});
  const onObjectDrop = object => {
    setObjects(prev => ({
      ...prev,
      [object.info.id]: {
        ...object.info
      }
    }));
    setConfig(prev => ({
      ...prev,
      [object.info.id]: {
        ...object.config
      }
    }));
  };

  return (
    <BlueprintContext.Provider
      value={{
        objects,
        config,
        selected,
        actions: {
          onObjectDrop,
          onSelectObject,
          setObjectConfig
        }
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};
