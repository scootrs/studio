import uuid from 'uuid/v4';
import { EventExternal } from '~types';
import { createExternalEventEndpoints } from './endpoints';
import Joi from '@hapi/joi';

export function createExternalEventResource(x, y) {
  return {
    meta: {
      id: uuid(),
      type: EventExternal,
      name: 'External Event',
      x,
      y,
      endpoints: createExternalEventEndpoints()
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
    },
    deployment: {
      url: '',
      method: ''
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
  if (val === '') {
    return 'Type is required';
  }
  return '';
}

export function validateUrl(val) {
  if (val === '') {
    return 'URL is required';
  }
  const re = /\/+ *$/gm;
  if (val.match(re)) {
    return 'URL cannot have a trailing slash';
  }
  return '';
}

export function validateMethod(method) {
  if (method === '') {
    return 'Method is required';
  }
  return '';
}
