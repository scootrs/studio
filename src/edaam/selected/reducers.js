import produce from 'immer';

import applicationEvents from 'edaam/application/events';
import eventEvents from 'edaam/event/events';
import handlerEvents from 'edaam/handler/events';
import storageEvents from 'edaam/storage/events';
import referenceEvents from 'edaam/reference/events';

const initialSelectedState = {
  application: 'edaam:application/default',
  resource: {
    type: null,
    id: null,
  },
};

const reduceSelected = produce((draft, action) => {
  switch (action.type) {
    case applicationEvents.SELECT:
      draft.application = action.payload;
      draft.resource = {
        type: null,
        id: null,
      };
      break;

    case eventEvents.SELECT:
      draft.resource = {
        type: 'event',
        id: action.payload,
      };
      break;

    case handlerEvents.SELECT:
      draft.resource = {
        type: 'handler',
        id: action.payload,
      };
      break;

    case handlerEvents.CREATE_SUCCESS:
      draft.resource = {
        type: 'handler',
        id: action.payload.id
      };
      break;

    case storageEvents.SELECT:
      draft.resource = {
        type: 'storage',
        id: action.payload,
      };
      break;

      case storageEvents.CREATE_SUCCESS:
        draft.resource = {
          type: 'storage',
          id: action.payload.id
        };
        break;

    case referenceEvents.SELECT:
      draft.resource = {
        type: 'reference',
        id: action.payload,
      };
  }
}, initialSelectedState);

export default reduceSelected;
