import uuid from 'uuid/v4';
import { EventExternal } from '~types';
import { createExternalEventEndpoints } from './endpoints';

export function createExternalEventResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: EventExternal,
      name: 'External Event',
      x,
      y,
      endpoints: createExternalEventEndpoints()
    },
    config: {
      id: '',
      type: ''
    }
  };
}
