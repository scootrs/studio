import { Reference } from '~types';
import Joi from '@hapi/joi';

export function createReferenceConnection(meta = {}) {
  return {
    meta: {
      // We use the meta ID generated by jsPlumb
      ...meta,
      type: Reference,
      name: 'Reference'
    },
    config: {
      id: '',
      allows: ''
      // We don't immediately grab the source and target. We will grab it when we pack the configuration to send
      // to the deployment server. This helps us avoid state inconsitencies and complext update logic when resources
      // are updated after connections have been made.
    },
    validation: {
      isValid: false,
      fields: {
        id: 'Reference ID is required',
        allows: 'Permissions are required'
      }
    }
  };
}

const idSchema = Joi.string()
  .alphanum()
  .error(new Error('Reference ID must only contain alphanumeric characters'));

export function validateId(val) {
  if (val === '') return 'Reference ID is required';
  const { error } = idSchema.validate(val);
  if (error) return error.message;
  return '';
}

export function validateAllows(val) {
  if (val === '') return 'Permissions are required';
  return '';
}
