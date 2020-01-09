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
 *     },
 *     monitor: {
 *         // Type specific monitoring information
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
  provider: '',
  application: {
    name: '',
    region: ''
  },
  objects: {},
  connections: {},
  selected: '',
  pending: false
};

const WorkspaceContext = React.createContext(state);

const useWorkspaceContext = () => useContext(WorkspaceContext);
export default useWorkspaceContext;

export const WorkspaceContextProvider = ({ children }) => {
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

  const removeObject = function(id) {
    setCurrent(function(prev) {
      // Remove the object
      const { [id]: omit, ...objects } = prev.objects;

      // Remove the connections assiciated with the object
      const connections = {};
      const removedConnections = [];
      Object.values(prev.connections).forEach(conn => {
        if (conn.source.id === id || conn.target.id === id) {
          removedConnections.push(conn.id);
        } else {
          connections[conn.id] = { ...conn };
        }
      });

      // Update the selected object reference (if necessary)
      let selected = prev.selected;
      if (selected.id === id || removedConnections.includes(selected.id)) {
        selected = null;
      } else if (objects[selected.id]) {
        // Preventing memory leaks by removing the reference to the old object
        selected = objects[selected.id];
      } else {
        // Preventing memory leaks by removing the reference to the old connection
        selected = connections[selected.id];
      }

      return {
        ...prev,
        objects,
        connections,
        selected
      };
    });
  };

  const addConnection = (conn, select = true) =>
    setCurrent(prev => ({
      ...prev,
      connections: {
        ...prev.connections,
        [conn.id]: conn
      },
      selected: select ? conn : prev.selected
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

  const setProvider = provider =>
    setCurrent(prev => ({
      ...prev,
      provider: provider
    }));

  const setApplicationConfig = config =>
    setCurrent(prev => ({
      ...prev,
      application: {
        ...prev.application,
        ...config
      }
    }));

  const setPending = val =>
    setCurrent(prev => ({
      ...prev,
      pending: val
    }));

  const setMonitoring = monitors =>
    setCurrent(prev => {
      let objects = { ...prev.objects };
      monitors.forEach(m => {
        objects[m.id] = {
          ...objects[m.id],
          monitor: m
        };
      });
      return {
        ...prev,
        objects,
        selected: objects[prev.selected.id]
      };
    });

  const pack = () => ({
    objects: Object.values(current.objects).map(o => ({ type: o.type, config: { ...o.config } })),
    connections: Object.values(current.connections).map(c => ({
      type: `${current.objects[c.source.id].type}-${current.objects[c.target.id].type}`,
      source: current.objects[c.source.id].config.id,
      target: current.objects[c.target.id].config.id,
      config: { ...c.config }
    })),
    provider: current.provider,
    application: { ...current.application }
  });

  return (
    <WorkspaceContext.Provider
      value={{
        ...current,
        actions: {
          setSelected,
          addObject,
          setObjectConfig,
          setSelectedObjectConfig,
          removeObject,
          addConnection,
          setSelectedConnectionConfig,
          removeConnection,
          setProvider,
          setApplicationConfig,
          setPending,
          setMonitoring,
          pack
        }
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
