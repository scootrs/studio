import { useWorkspaceContext } from '~contexts/workspace';
import { getDefaultsForType } from './defaults';
import { useKeyValueDetailTabs } from './key-value';
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
            let defaults = getDefaultsForType(newValue);
            updateSelectedConfiguration(
              {
                type: newValue,
                ...defaults
              },
              { type: validateType(newValue) }
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
