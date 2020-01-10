import uuid from 'uuid/v4';
import { EventInternal } from '~types';

export function createInternalEventResource(x, y, config) {
  return {
    meta: {
      id: uuid(),
      type: EventInternal,
      name: 'Internal Event',
      x,
      y
    },
    config: {
      id: '',
      type: ''
    }
  };
}
