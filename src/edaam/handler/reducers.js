import produce from 'immer';
import uuid from 'uuid/v4';

import events from './events';
import { captions, validators } from './validation';

const initialState = {};

function createHandler(options) {
  return {
    id: 'edaam:handler/' + uuid(),
    name: '',
    runtime: '',
    code: '',
    environment: [],
    _meta: {
      id: uuid(),
      type: 'handler',
      tooltip: 'Handler',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isSource: true,
          id: uuid(),
          scopes: ['storage', 'event-internal'],
        },
        {
          isTarget: true,
          id: uuid(),
          scopes: ['compute'],
        },
      ],
      errors: {
        name: captions.NameMissing,
        runtime: captions.RuntimeMissing,
        code: captions.CodeMissing,
      },
    },
  };
}

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.CREATE:
      const newHandler = createHandler(action.payload);
      draft[newHandler.id] = newHandler;
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
      const handler = draft[action.payload.id];
      handler._meta.position.x = action.payload.x;
      handler._meta.position.y = action.payload.y;
      break;
  }
}, initialState);

export default reduce;
