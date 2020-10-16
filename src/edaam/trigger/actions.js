import action from 'shared/action';

import events from './events';

export default {
  select: (id) => action(events.SELECT, id),
  create: (options) => action(events.CREATE, options),
  update: (id, property, value) => action(events.UPDATE, { id, property, value }),
  delete: (id) => action(events.DELETE, id),
};
