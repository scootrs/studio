import uuid from 'uuid/v4';
import { Storage } from '~types';
import { createStorageEndpoints } from './endpoints';
import Joi from '@hapi/joi';

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
    },
    validation: {
      isValid: false,
      fields: {
        id: 'Resource ID must only contain alphanumeric characters',
        type: 'Type is required'
      }
    }
  };
}

const idSchema = Joi.string()
  .alphanum()
  .error(new Error('Resource ID must only contain alphanumeric characters'));

export function validateId(val) {
  const { error } = idSchema.validate(val);
  if (error) return error.message;
  return '';
}

export function validateType(val) {
  if (val === '') return 'Type is required';
  return '';
}
