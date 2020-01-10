import uuid from 'uuid/v4';
import { Compute } from '~types';

export function createComputeResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: Compute,
      name: 'Compute',
      x,
      y
    },
    config: {
      id: '',
      runtime: '',
      vcs: '',
      code: '',
      environment: [],
      tags: []
    }
  };
}