export const Compute = Symbol('compute');
export const Storage = Symbol('storage');
export const EventInternal = Symbol('event-internal');
export const EventExternal = Symbol('event-external');
export const Reference = Symbol('reference');
export const Trigger = Symbol('trigger');

export function serializeType(type) {
  switch (type) {
    case Compute:
      return 'compute';
    case Storage:
      return 'storage';
    case EventExternal:
      return 'event-external';
    case EventInternal:
      return 'event-internal';
    case Reference:
      return 'reference';
    case Trigger:
      return 'trigger';
    default:
      throw new Error('Failed to serialize type: The type ' + type.toString() + ' is not valid');
  }
}

export function deserializeType(type) {
  switch (type) {
    case 'compute':
      return Compute;
    case 'storage':
      return Storage;
    case 'event-external':
      return EventExternal;
    case 'event-internal':
      return EventInternal;
    case 'reference':
      return Reference;
    case 'trigger':
      return Trigger;
    default:
      throw new Error('Failed to deserialize type: The type ' + type.toString() + ' is not recognized');
  }
}
