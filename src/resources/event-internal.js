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
        id: 'Resource ID must only contain alphanumeric characters',
        broker: 'Broker is required',
        name: 'Topic name is required',
        broker: 'Broker is required'
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

export function validateBroker(val) {
  if (val === '') return 'Broker is required';
  return '';
}

const topicNameSchema = Joi.string()
  .regex(/^[a-zA-Z0-9\-_]+$/m)
  .error(new Error('Topic name must only included alphanumeric characters, dashes, and underscores'));

export function validateTopicName(name) {
  if (name === '') return 'Topic name is required';
  const { error } = topicNameSchema.validate(name);
  if (error) return error.message;
  return '';
}
