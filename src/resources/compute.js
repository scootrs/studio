import uuid from 'uuid/v4';
import { Compute } from '~types';
import { createComputeEndpoints } from './endpoints';

export function createComputeResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: Compute,
      name: 'Compute',
      x,
      y,
      endpoints: createComputeEndpoints(),
      isValid: false,
      errors: {
        id: '',
        runtime: '',
        vcs: '',
        code: '',
        environment: '',
        tags: ''
      }
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
