import action from 'shared/action';

import events from './events';

export default {
  select: (id) => action(events.SELECT, id),
  create: (options) => action(events.CREATE, options),
  update: (id, property, value) => action(events.UPDATE, { id, property, value }),
  delete: (id) => action(events.DELETE, id),

  // Position
  updatePosition: (id, x, y) => action(events.UPDATE_POSITION, { id, x, y }),

  // Log Fetching
  fetchLogs: (id) => action(events.FETCH_LOGS, id),
  fetchLogsResult: (id, result, error = false) => action(events.FETCH_LOGS_RESULT, { id, result }, error),
  fetchLogsUpdate: (id, logs) => action(events.FETCH_LOGS_UPDATE, { id, logs }),
  cancelFetchLogs: (id) => action(events.CANCEL_FETCH_LOGS, id),
};
