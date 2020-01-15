import uuid from 'uuid/v4';
import { Storage } from '~types';
import { createStorageEndpoints } from './endpoints';

export function createStorageResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: Storage,
      name: 'Storage',
      x,
      y,
      endpoints: createStorageEndpoints()
    },
    config: {
      id: '',
      type: ''
    }
  };
}
