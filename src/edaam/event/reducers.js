import produce from 'immer';
import uuid from 'uuid/v4';

import events from './events';
import { captions, validators } from './validation';

const initialState = {};

function createEvent(type, options) {
  switch (type) {
    case 'internal':
      return createInternalEvent(options);

    case 'external':
      return createExternalEvent(options);
  }
}

function createInternalEvent(options) {
  return {
    id: 'edaam:event/' + uuid(),
    subclass: 'internal',
    name: '',
    type: '',
    broker: '',
    topic: '',
    _meta: {
      id: uuid(),
      type: 'internal-event',
      tooltip: 'Internal Event',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isSource: true,
          id: uuid(),
          scopes: ['handler'],
          dashed: true,
        },
        {
          isTarget: true,
          id: uuid(),
          scopes: ['event-internal'],
          dashed: true,
        },
      ],
      errors: {
        name: captions.NameMissing,
        type: captions.TypeMissing,
        broker: captions.BrokerMissing,
        topic: captions.TopicNameMissing,
      },
    },
  };
}

function createExternalEvent(options) {
  return {
    id: 'edaam:event/' + uuid(),
    subclass: 'external',
    name: '',
    type: '',
    path: '',
    method: '',
    _meta: {
      id: uuid(),
      type: 'external-event',
      tooltip: 'External Event',
      position: { x: options.x, y: options.y },
      endpoints: [
        {
          isSource: true,
          id: uuid(),
          scopes: ['handler'],
          dashed: true,
        },
      ],
      errors: {
        name: captions.NameMissing,
        type: captions.TypeMissing,
        path: captions.PathMissing,
        method: captions.HttpMethodMissing,
      },
    },
  };
}

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.CREATE:
      const newEvent = createEvent(action.payload.type, action.payload.options);
      draft[newEvent.id] = newEvent;
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
      const event = draft[action.payload.id];
      event._meta.position.x = action.payload.x;
      event._meta.position.y = action.paylad.y;
      break;
  }
}, initialState);

export default reduce;
