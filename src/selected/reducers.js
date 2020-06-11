import produce from 'immer';

import applicationEvents from 'application/events';

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
      break;
  }
}, initialSelectedState);

export default reduceSelected;
