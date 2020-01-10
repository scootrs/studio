import uuid from 'uuid/v4';
import { Storage } from '~types';

export function createStorageResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: Storage,
      name: 'Storage',
      x,
      y
    },
    config: {
      id: '',
      type: ''
    }
  };
}
