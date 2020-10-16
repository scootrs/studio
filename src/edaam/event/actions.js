import action from 'shared/action';

import events from './events';

export default {
  select: (id) => action(events.SELECT, id),
  create: (type, options) => action(events.CREATE, { type, options }),
  update: (id, property, value) => action(events.UPDATE, { id, property, value }),
  delete: (id) => action(events.DELETE, id),
  updatePosition: (id, x, y) => action(events.UPDATE_POSITION, { id, x, y }),
};
