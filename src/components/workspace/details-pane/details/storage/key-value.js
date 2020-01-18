import Joi from '@hapi/joi';

export const defaults = {
  config: {
    collection: '',
    keyName: '',
    keyType: ''
  },
  validation: {
    collection: 'Collection name is required',
    keyName: 'Primary key name is required',
    keyType: 'Primary key type is required'
  }
};

const collectionNameSchema = Joi.string()
  .min(3)
  .max(255)
  .regex(/^[a-zA-Z0-9\-\.\_]+$/m)
  .error(
    new Error(
      'Collection name must be between 3 and 255 characters and only contain alphanumeric characters, dashes, underscores, and periods'
    )
  );

function validateCollection(val) {
  if (val === '') return 'Collection name is required';
  const { error } = collectionNameSchema.validate(val);
  if (error) return error.message;
  return '';
}

const primaryKeyName = Joi.string()
  .min(1)
  .max(255)
  .regex(/^[a-zA-Z0-9\-\.\_]+$/m)
  .error(
    new Error(
      'Primary key name must be between 3 and 255 characters and only contain alphanumeric characters, dashes, underscores, and periods'
    )
  );

function validateKeyName(val) {
  if (val === '') return 'Primary key name is required';
  const { error } = primaryKeyName.validate(val);
  if (error) return error.message;
  return '';
}

function validateKeyType(val) {
  if (val === '') return 'Primary key type is required';
  return '';
}

export function useKeyValueDetailTabs(selected, updateSelectedConfiguration) {
  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'validated-text',
              label: 'Collection Name',
              name: 'collection',
              value: selected.config.collection,
              onChangeEnd: function(val, error) {
                updateSelectedConfiguration({ collection: val }, { collection: error });
              },
              onValidate: function(val) {
                return validateCollection(val);
              },
              seedIsValid: selected.validation.fields.collection === '',
              seedCaption: selected.validation.fields.collection
            },
            {
              type: 'validated-text',
              label: 'Primary Key Name',
              name: 'keyName',
              value: selected.config.keyName,
              onChangeEnd: function(val, error) {
                updateSelectedConfiguration({ keyName: val }, { keyName: error });
              },
              onValidate: function(val) {
                return validateKeyName(val);
              },
              seedIsValid: selected.validation.fields.keyName === '',
              seedCaption: selected.validation.fields.keyName
            },
            {
              type: 'validated-select',
              label: 'Primary Key Type',
              name: 'keyType',
              value: selected.config.keyType,
              onChange: function(ev) {
                const newValue = ev.target.value;
                updateSelectedConfiguration({ keyType: newValue }, { keyType: validateKeyType(newValue) });
              },
              options: [
                {
                  name: 'Please select a type',
                  value: ''
                },
                {
                  name: 'String',
                  value: 'S'
                },
                {
                  name: 'Number',
                  value: 'N'
                }
              ],
              isValid: selected.validation.fields.keyType === '',
              caption: selected.validation.fields.keyType
            }
          ]
        }
      ]
    }
  ];
}
