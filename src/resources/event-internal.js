import uuid from 'uuid/v4';
import { EventInternal } from '~types';
import { createInternalEventEndpoints } from './endpoints';

export function createInternalEventResource(x, y, config) {
  return {
    meta: {
      id: uuid(),
      type: EventInternal,
      name: 'Internal Event',
      x,
      y,
      endpoints: createInternalEventEndpoints()
    },
    config: {
      id: '',
      type: ''
    }
  };
}
