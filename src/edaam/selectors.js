export default {
  getHandlerResources: (state) => state.handlers,
  getStorageResources: (state) => state.storage,
  getEventResources: (state) => state.events,
  getTriggerConnections: (state) => state.triggers,
  getReferenceConnections: (state) => state.references,
};
