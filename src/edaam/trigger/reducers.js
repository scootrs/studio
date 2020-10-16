import produce from 'immer';
import uuid from 'uuid/v4';

import events from './events';

const initialState = {};

function createTrigger(options) {
  return {
    id: 'edaam:trigger/' + uuid(),
    source: options.source,
    target: options.target,
    _meta: {
      id: uuid(),
      type: 'trigger',
      tooltip: 'Trigger',
    },
  };
}

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.CREATE:
      const handler = createTrigger(action.payload);
      draft[handler.id] = handler;
      break;

    case events.DELETE:
      delete draft[action.payload];
      break;
  }
}, initialState);

export default reduce;

