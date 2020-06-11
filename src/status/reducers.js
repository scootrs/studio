import produce from 'immer';

import events from './events';

const initialState = {
  message: null,
  isWaiting: false,
};

const reduce = produce((draft, action) => {
  switch (action.type) {
    case events.UPDATE_MESSAGE:
      draft.message = action.payload;
      break;

    case events.UPDATE_WAITING:
      draft.isWaiting = action.payload;
      break;
  }
}, initialState);

export default reduce;
