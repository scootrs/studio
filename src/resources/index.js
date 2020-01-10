import { Compute, Storage, EventInternal, EventExternal } from '~types';
import { createComputeResource } from './compute';
import { createStorageResource } from './storage';
import { createInternalEventResource } from './event-internal';
import { createExternalEventResource } from './event-external';

export function createResourceWithType(type, x, y) {
  switch (type) {
    case Compute:
      return createComputeResource(x, y);

    case Storage:
      return createStorageResource(x, y);

    case EventInternal:
      return createInternalEventResource(x, y);

    case EventExternal:
      return createExternalEventResource(x, y);

    default:
      throw new Error('Failed to create resource: invalid type "' + type + '" supplied');
  }
}
