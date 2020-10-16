import Joi from '@hapi/joi';

export const captions = {
  NameMissing: 'Reference name is required',
  NameInvalid: 'Reference name must only contain alphanumeric characters',
  PermissionsMissing: 'Permissions are required',
};

const nameSchema = Joi.string().alphanum().error(new Error(captions.NameInvalid));

export const validators = {
  name: (val) => {
    if (val === '' || val === null) return captions.NameMissing;
    const { error } = nameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  permissions: (val) => {
    if (val === null || val.length === 0) return captions.PermissionsMissing;
    return null;
  },
};
