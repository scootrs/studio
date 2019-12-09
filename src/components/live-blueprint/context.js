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
 *         id: '',
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
 *     type: '',
 *     source: '',
 *     target: '',
 *     config: {
 *         id: '',
 *         allows: '',
 *         // Future type specific configurations
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
      selected: object
    }));

  const addObject = object =>
    setCurrent(prev => ({
      ...prev,
      objects: {
        ...prev.objects,
        [object.id]: object
      },
      selected: object
    }));

  const setObjectConfig = (id, config) =>
    setCurrent(prev => {
      let updated = {
        ...prev.objects[id],
        config: {
          ...prev.objects[id].config,
          ...config
        }
      };
      return {
        ...prev,
        objects: {
          ...prev.objects,
          [id]: updated
        },
        selected: prev.selected && prev.selected.id === id ? updated : prev.selected
      };
    });

  const setSelectedObjectConfig = config => current.selected && setObjectConfig(current.selected.id, config);

  const addConnection = conn =>
    setCurrent(prev => ({
      ...prev,
      connections: {
        ...prev.connections,
        [conn.id]: conn
      },
      selected: conn
    }));

  const setConnectionConfig = (id, config) =>
    setCurrent(prev => {
      let updated = {
        ...prev.connections[id],
        config: {
          ...prev.connections[id].config,
          ...config
        }
      };
      return {
        ...prev,
        connections: {
          ...prev.connections,
          [id]: updated
        },
        selected: prev.selected && prev.selected.id === id ? updated : prev.selected
      };
    });

  const setSelectedConnectionConfig = config => current.selected && setConnectionConfig(current.selected.id, config);

  const removeConnection = conn =>
    setCurrent(prev => {
      const connections = Object.values(prev.connections)
        .filter(c => c.id !== conn.id)
        .reduce((cs, c) => (cs[c.id] = c), {});
      return {
        ...prev,
        connections,
        selected: null
      };
    });

  return (
    <BlueprintContext.Provider
      value={{
        ...current,
        actions: {
          setSelected,
          addObject,
          setObjectConfig,
          setSelectedObjectConfig,
          addConnection,
          setSelectedConnectionConfig,
          removeConnection
        }
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};
