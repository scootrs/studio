export default {
  getAll: (state) => state[state.selected.application],
  getId: state => state.selected.application,
  getName: (state) => state[state.selected.application].name,
  getIsNameValid: (state) => {
    const app = state[state.selected.application];
    if (app.name === '') {
      return { valid: false, message: 'Application name is required' };
    }
    if (!/(^[a-z0-9]+$)/gim.test(app.name)) {
      return { valid: false, message: 'Application name must only contain alphanumeric characters' };
    }
    return { valid: true };
  },
  getProvider: (state) => state[state.selected.application].provider,
  getIsProviderValid: (state) => {
    const app = state[state.selected.application];
    if (app.provider === null || app.provider === '') {
      return { valid: false, message: 'Provider cannot be empty' };
    }
    return { valid: true };
  },
  getRegion: (state) => state[state.selected.application].region,
  getIsRegionValid: (state) => {
    const app = state[state.selected.application];
    if (app.region === null || app.region === '') {
      return { valid: false, message: 'Region cannot be empty' };
    }
    return { valid: true };
  },
  getIsDeployed: (state) => state[state.selected.application].isDeployed,
  getIsDeploying: (state) => state[state.selected.application].isDeploying,
  getHasUnsavedChanges: (state) => state[state.selected.application].hasUnsavedChanges,
};
