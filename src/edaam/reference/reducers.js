import produce from 'immer';
import uuid from 'uuid/v4';

import events from './events';
import { captions, validators } from './validation';

const initialState = {};

function createReference(options) {
  return {
    id: 'edaam:reference/' + uuid(),
    name: '',
    permissions: [],
    _meta: {
      id: uuid(),
      type: 'reference',
      tooltip: 'Reference',
      position: { x: options.x, y: options.y },
      endpoints: [],
      errors: {
        name: captions.NameMissing,
        permissions: captions.PermissionsMissing,
      },
    },
  };
}

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.CREATE:
      const handler = createReference(action.payload);
      draft[handler.id] = handler;
      break;

    case events.UPDATE:
      draft[action.payload.id][action.payload.property] = action.payload.value;
      const error = validators[action.payload.property](action.payload.value);
      if (error) {
        draft[action.payload.id]._meta.errors[action.payload.property] = error;
      } else {
        delete draft[action.payload.id]._meta.errors[action.payload.property];
      }
      break;

    case events.DELETE:
      delete draft[action.payload];
      break;
  }
}, initialState);

export default reduce;