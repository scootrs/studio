import producer from 'immer';

import events from './events';

const initialState = {
  'edaam:application/default': {
    id: 'edaam:application/default',
    name: null,
    provider: null,
    region: null,
    isDeployed: false,
    isDeploying: false,
    hasUnsavedChanges: true,
  },
};

const reduce = producer((draft, action) => {
  switch (action.type) {
    case events.UPDATE_NAME:
      draft[action.payload.id].name = action.payload.name;
      break;

    case events.UPDATE_PROVIDER:
      draft[action.payload.id].provider = action.payload.provider;
      break;

    case events.UPDATE_REGION:
      draft[action.payload.id].region = action.payload.region;
      break;

    case events.QUEUE_DEPLOYMENT:
      draft[action.payload.id].isDeploying = true;
      break;

    case events.QUEUE_DEPLOYMENT_RESULT:
      if (action.error) {
        draft[action.payload.id].isDeploying = false;
      }
      break;

    case events.DEPLOYMENT_RESULT:
      if (!action.error && !draft[action.payload.id].isDeployed) {
        draft[action.payload.id].isDeployed = true;
      }
      break;

    case events.SAVE:
      draft[action.payload.id].hasUnsavedChanges = false;
      break;
  }
}, initialState);

export default reduce;
