import React, { useState, useContext } from 'react';

/**
 * Represents the structure of the state of the blueprint context.
 *
 * The `objects` object is formatted as follows:
 *
 * ```js
 * [id]: {
 *     id: '',
 *     type: '',
 *     x: 0,
 *     y: 0,
 *     config: {
 *         // Type specific configuration
 *     }
 * }
 * ```
 *
 * The `connections` object is structured as follows:
 *
 * ```js
 * [id]: {
 *     id: '',
 *     source: '',
 *     target: '',
 *     allows: [],
 *     config: {
 *         // Future connection specific configurations
 *     }
 * }
 * ```
 *
 */
const state = {
  objects: {},
  connections: {},
  selected: ''
};

const BlueprintContext = React.createContext(state);

const useBlueprintContext = () => useContext(BlueprintContext);
export default useBlueprintContext;

export const BlueprintContextProvider = ({ children }) => {
  const [current, setCurrent] = useState(state);

  const setSelected = object =>
    setCurrent(prev => ({
      ...prev,
      selected: object ? object.id : null
    }));

  const setObject = object =>
    setCurrent(prev => ({
      ...prev,
      objects: {
        ...prev.objects,
        [object.id]: object
      }
    }));

  const setSelectedObjectConfig = config =>
    setCurrent(prev => ({
      ...prev,
      objects: {
        ...prev.objects,
        [prev.selected]: {
          ...prev.objects[prev.selected],
          config: {
            ...prev.objects[prev.selected].config,
            ...config
          }
        }
      }
    }));

  return (
    <BlueprintContext.Provider
      value={{
        ...current,
        actions: {
          setSelected,
          setObject,
          setSelectedObjectConfig
        }
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};
