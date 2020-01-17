import uuid from 'uuid/v4';
import { Compute } from '~types';
import { createComputeEndpoints } from './endpoints';
import Joi from '@hapi/joi';

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
      hasError: false
    },
    config: {
      id: '',
      runtime: '',
      vcs: '',
      code: '',
      environment: [],
      tags: []
    },
    deployment: {},
    validation: {
      isValid: false,
      fields: {
        id: 'Resource ID is required',
        runtime: 'Runtime has not been selected',
        vcs: '',
        code: 'Missing code content',
        environment: '',
        tags: ''
      }
    }
  };
}

const idSchema = Joi.string()
  .alphanum()
  .error(new Error('ID must only contain alphanumeric characters'));
export function validateId(id) {
  if (id === '') return 'Resource ID is required';
  const { error } = idSchema.validate(id);
  if (error) return error.message;
  return '';
}
