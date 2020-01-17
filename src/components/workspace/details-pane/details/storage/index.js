import { useWorkspaceContext } from '~contexts/workspace';
import { getDefaultsForType } from './defaults';
import { useKeyValueDetailTabs } from './key-value';
import { validateId } from '~resources/storage';

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
        seedIsValid: selected.validation.isValid,
        seedCaption: selected.validation.fields.id
      },
      inputs: [
        {
          type: 'select',
          name: 'type',
          value: selected.config.type,
          onChange: function(ev) {
            let defaults = getDefaultsForType(ev.target.value);
            updateSelectedConfiguration({
              [ev.target.name]: ev.target.value,
              ...defaults
            });
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
          ]
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
