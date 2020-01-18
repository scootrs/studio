import { useWorkspaceContext } from '~contexts/workspace';
import { useKeyValueDetailTabs, defaults as keyValueDefaults } from './key-value';
import { validateId, validateType } from '~resources/storage';

export default function useStorageDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  return {
    type: selected.meta.type,
    header: {
      icon: selected.meta.type,
      title: {
        name: 'id',
        value: selected.config.id,
        placeholder: 'UnnamedStorage',
        onChangeEnd: function(val, error) {
          updateSelectedConfiguration({ id: val }, { id: error });
        },
        onValidate: function(val) {
          return validateId(val);
        },
        seedIsValid: selected.validation.fields.id === '',
        seedCaption: selected.validation.fields.id
      },
      inputs: [
        {
          type: 'validated-select',
          name: 'type',
          value: selected.config.type,
          onChange: function(ev) {
            const newValue = ev.target.value;
            let defaults = null;
            switch (newValue) {
              case 'keyval':
                defaults = keyValueDefaults;

              case '':
                break;

              default:
                throw new Error('Failed to get default storage configuration: The type ' + type + ' is invalid');
            }
            updateSelectedConfiguration(
              {
                type: newValue,
                ...defaults.config
              },
              { type: validateType(newValue), ...defaults.validation }
            );
          },
          options: [
            {
              name: 'Please select a storage type',
              value: ''
            },
            {
              name: 'Key-Value',
              value: 'keyval'
            }
          ],
          isValid: selected.validation.fields.type === '',
          caption: selected.validation.fields.type
        }
      ]
    },
    tabs: getTabsForType(selected, updateSelectedConfiguration)
  };
}

function getTabsForType(selected, updateSelectedConfiguration) {
  switch (selected.config.type) {
    case 'keyval':
      return useKeyValueDetailTabs(selected, updateSelectedConfiguration);

    default:
      return [];
  }
}
