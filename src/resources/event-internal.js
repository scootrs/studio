import uuid from 'uuid/v4';
import { EventInternal } from '~types';
import { createInternalEventEndpoints } from './endpoints';
import Joi from '@hapi/joi';

export function createInternalEventResource(x, y, config) {
  return {
    meta: {
      id: uuid(),
      type: EventInternal,
      name: 'Internal Event',
      x,
      y,
      endpoints: createInternalEventEndpoints()
    },
    config: {
      id: '',
      type: '',
      broker: '',
      name: ''
    },
    validation: {
      isValid: false,
      fields: {
        id: 'Resource ID must only contain alphanumeric characters'
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
