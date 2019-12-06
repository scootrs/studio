import React from 'react';

export const initialState = {
  computeObjects: {},
  storageObjects: {},
  eventObjects: {}
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

export const onDropComputeObject = setState => computeObject =>
  setState(prev => ({
    ...prev,
    computeObjects: {
      ...prev.computeObjects,
      [computeObject.id]: computeObject
    }
  }));

export const onDropStorageObject = setState => storageObject =>
  setState(prev => ({
    ...prev,
    storageObjects: {
      ...prev.storageObjects,
      [storageObject.id]: storageObject
    }
  }));

export const onDropEventObject = setState => eventObject =>
  setState(prev => ({
    ...prev,
    eventObjects: {
      ...prev.eventObjects,
      [eventObject.id]: eventObject
    }
  }));

const context = React.createContext(initialState);

export const LiveBlueprintContextProvider = context.Provider;

export const LiveBlueprintContextConsumer = context.Consumer;

export default context;
