import produce from 'immer';
import uuid from 'uuid/v4';

import events from './events';
import { captions, validators } from './validation';

const initialState = {};

function createStorage(options) {
  return {
    id: 'edaam:storage/' + uuid(),
    name: '',
    type: '',
    _meta: {
      id: uuid(),
      type: 'storage',
      tooltip: 'Storage',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isTarget: true,
          id: uuid(),
          scopes: ['handler'],
        },
      ],
      errors: {
        name: captions.NameMissing,
        type: captions.TypeMissing,
      },
    },
  };
}

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.CREATE:
      const newStorage = createStorage(action.payload);
      draft[newStorage.id] = newStorage;
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

    case events.UPDATE_POSITION:
      const storage = draft[action.payload.id];
      storage._meta.position.x = action.payload.x;
      storage._meta.position.y = action.payload.y;
  }
}, initialState);

export default reduce;
