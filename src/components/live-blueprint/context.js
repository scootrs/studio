import React from 'react';

export const initialState = {
  objects: {},
  current: {
    type: null,
    id: null
  }
};

export const onDropMux = setState => object => {
  switch (object.data.type) {
    case 'compute':
      return onDropComputeObject(setState)(object);

    case 'storage':
      return onDropStorageObject(setState)(object);

    case 'event':
      return onDropEventObject(setState)(object);

    default:
      throw new Error('Unsupported object type: ' + object.data.type);
  }
};

export const onDropComputeObject = setState => object =>
  setState(prev => ({
    ...prev,
    objects: {
      ...prev.objects,
      [object.id]: object
    }
  }));

export const onDropStorageObject = setState => object =>
  setState(prev => ({
    ...prev,
    objects: {
      ...prev.objects,
      [object.id]: object
    }
  }));

export const onDropEventObject = setState => object =>
  setState(prev => ({
    ...prev,
    objects: {
      ...prev.objects,
      [object.id]: object
    }
  }));

export const onObjectSelect = setState => object =>
  setState(prev => ({
    ...prev,
    objects:
      prev.current.id !== null
        ? {
            ...prev.objects,
            [prev.current.id]: {
              ...prev.objects[prev.current.id],
              selected: false
            },
            [object.id]: {
              ...prev.objects[object.id],
              selected: true
            }
          }
        : {
            ...prev.objects,
            [object.id]: {
              ...prev.objects[object.id],
              selected: true
            }
          },
    current: {
      type: object.data.type,
      id: object.id
    }
  }));

export const onClearSelectedObject = setState => () =>
  setState(prev => ({
    ...prev,
    objects: {
      ...prev.objects,
      [prev.current.id]: {
        ...prev.objects[prev.current.id],
        selected: false
      }
    },
    current: {
      type: null,
      id: null
    }
  }));

const context = React.createContext(initialState);

export const LiveBlueprintContextProvider = context.Provider;

export const LiveBlueprintContextConsumer = context.Consumer;

export default context;
