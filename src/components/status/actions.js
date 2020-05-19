import events from './events';

import action from 'shared/action';

const updateMessage = (message) => action(events.UPDATE_MESSAGE, message);
const clearMessage = () => action(events.UPDATE_MESSAGE, null);
const setWaiting = () => action(events.UPDATE_WAITING, true);
const setNotWaiting = () => action(events.UPDATE_WAITING, false);

export default {
  updateMessage,
  clearMessage,
  setWaiting,
  setNotWaiting,
};
