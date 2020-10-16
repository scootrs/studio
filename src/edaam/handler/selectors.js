export default {
  getIsSelected: (id) => (state) => {
    return state.selected.resource.id === id;
  },
  getIsValid: (id) => (state) => {
    const event = state.handlers[id];
    return Object.keys(event._meta.errors).length == 0;
  },
  getLogs: (id) => (state) => {
    const deployed = state.deployed[id];
    if (!deployed) {
      return null;
    }
    return deployed.logs;
  },
};
