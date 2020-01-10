import { Trigger, Reference } from '~types';
import { createTriggerConnection } from './trigger';
import { createReferenceConnection } from './reference';

export function createConnectionWithType(type, source, target, meta = {}) {
  switch (type) {
    case Trigger:
      return createTriggerConnection(source, target, meta);

    case Reference:
      return createReferenceConnection(source, target, meta);

    default:
      throw new Error('Failed to create connection: The type "' + type + '" is invalid');
  }
}
