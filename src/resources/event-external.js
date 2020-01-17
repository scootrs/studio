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
        id: 'Resource ID must only contain alphanumeric characters'
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
