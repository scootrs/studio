import uuid from 'uuid/v4';
import { EventExternal } from '~types';

export function createExternalEventResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: EventExternal,
      name: 'External Event',
      x,
      y
    },
    config: {
      id: '',
      type: ''
    }
  };
}
