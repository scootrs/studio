import { Trigger, Reference } from '~types';
import { createTriggerConnection } from './trigger';
import { createReferenceConnection } from './reference';

export function createConnectionWithType(type, meta = {}) {
  switch (type) {
    case Trigger:
      return createTriggerConnection(meta);

    case Reference:
      return createReferenceConnection(meta);

    default:
      throw new Error('Failed to create connection: The type "' + type + '" is invalid');
  }
}
