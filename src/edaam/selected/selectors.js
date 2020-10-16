export default {
  getSelectedResource: (state) => {
    const type = state.selected.resource.type;
    if (!type) {
      return null;
    }

    const id = state.selected.resource.id;

    switch (type) {
      case 'handler':
        return state.handlers[id];

      case 'storage':
        return state.storage[id];

      case 'external-event':
      case 'internal-event':
        return state.events[id];

      case 'reference':
        return state.references[id];
    }

    return null;
  },
};
