import Joi from '@hapi/joi';

export const captions = {
  NameMissing: 'Handler name is required',
  NameInvalid: 'Handler name must only contain alphanumeric characters',
  RuntimeMissing: 'Runtime is required',
  CodeMissing: 'Handler code missing',
};

const nameSchema = Joi.string().alphanum().error(new Error(captions.NameInvalid));

export const validators = {
  name: (val) => {
    if (val === '' || val === null) return captions.NameMissing;
    const { error } = nameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  runtime: (val) => {
    if (val === '' || val === null) return captions.RuntimeMissing;
    return null;
  },
  code: (val) => {
    if (val === '' || val === null) return captions.CodeMissing;
    return null;
  },
  environment: (val) => {
    return null;
  },
};
