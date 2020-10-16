import Joi from '@hapi/joi';

export const captions = {
  // General
  NameMissing: 'Storage name is required',
  NameInvalid: 'Storage name must only contain alphanumeric characters',
  TypeMissing: 'Storage type is missing',

  // Key-Value Storage
  CollectionMissing: 'Collection name is required',
  ColectionNameInvalid:
    'Collection name must be between 3 and 255 characters and only contain alphanumeric ' +
    'characters, dashes, underscores, and periods',
  EngineMissing: 'Engine type is required',
  PrimaryKeyNameMissing: 'Primary key name is required',
  PrimaryKeyNameInvalid:
    'Primary key name must be between 3 and 255 characters and only contain alphanumeric ' +
    'characters, dashes, underscores, and periods',
  PrimaryKeyTypeMissing: 'Primary key type is required',
};

const nameSchema = Joi.string().alphanum().error(new Error(captions.NameInvalid));

const collectionNameSchema = Joi.string()
  .min(3)
  .max(255)
  .regex(/^[a-zA-Z0-9\-\.\_]+$/m)
  .error(new Error(captions.ColectionNameInvalid));

const primaryKeyNameSchema = Joi.string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9\-\.\_]+$/m)
  .error(new Error(captions.PrimaryKeyTypeMissing));

export const validators = {
  // General
  //
  name: (val) => {
    if (val === '' || val === null) return captions.NameMissing;
    const { error } = nameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  type: (val) => {
    if (val === '' || val === null) return captions.TypeMissing;
  },

  // Key-Value Storage
  //
  engine: (val) => {
    if (val === null || val === '') return captions.EngineMissing;
    return null;
  },
  collection: (val) => {
    if (val === null || val === '') return captions.CollectionMissing;
    const { error } = collectionNameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  keyName: (val) => {
    if (val === null || val === '') return captions.PrimaryKeyNameMissing;
    const { error } = primaryKeyNameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  keyType: (val) => {
    if (val === null || val === '') return captions.PrimaryKeyTypeMissing;
    return null;
  },
};
