export default {
  getIsSelected: (id) => (state) => {
    return state.selected.resource.id === id;
  },
  getIsValid: (id) => (state) => {
    const event = state.events[id];
    return Object.keys(event._meta.errors).length == 0;
  },
};
