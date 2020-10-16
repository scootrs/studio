import Joi from '@hapi/joi';

export const captions = {
  // Shared
  NameMissing: 'Resource name is required',
  NameInvalid: 'Resource name must only contain alphanumeric characters',
  TypeMissing: 'Event type is missing',

  // Internal Event
  BrokerMissing: 'Broker is required',
  TopicNameMissing: 'Topic name is required',
  TopicNameInvalid: 'Topic name must only include alphanumeric characters, dashes, and underscores',

  // External Event
  PathMissing: 'Path is required',
  PathInvalid: 'Path cannot have a trailing slash',
  HttpMethodMissing: 'Method is required',
};

const nameSchema = Joi.string().alphanum().error(new Error(captions.NameInvalid));

const topicNameSchema = Joi.string()
  .regex(/^[a-zA-Z0-9\-_]+$/m)
  .error(new Error(captions.TopicNameInvalid));

export const validators = {
  // Shared
  name: (val) => {
    if (val === '' || val === null) return captions.NameMissing;
    const { error } = nameSchema.validate(val);
    if (error) return error.message;
    return null;
  },
  type: (val) => {
    if (val === '' || val === null) return captions.TypeMissing;
  },

  // Internal Event
  broker: (val) => {
    if (val === '' || val === null) return captions.BrokerMissing;
    return null;
  },
  topic: (val) => {
    if (val === '' || val === null) return captions.TopicNameMissing;
    const { error } = topicNameSchema.validate(val);
    if (error) return error.message;
    return null;
  },

  // External Events
  path: (val) => {
    if (val === '' || val === null) return captions.PathMissing;
    const re = /\/+ *$/gm;
    if (val.match(re)) {
      return captions.PathInvalid;
    }
    return null;
  },
  method: (val) => {
    if (val === '' || val === null) return captions.HttpMethodMissing;
    return null;
  },
};
