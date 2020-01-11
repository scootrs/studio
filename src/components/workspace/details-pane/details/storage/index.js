import { useWorkspaceContext } from '~contexts/workspace';
import { validateName } from '../validation';
import { getDefaultsForType } from './defaults';
import { useDocumentStorageDetailTabs } from './document';

export default function useStorageDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const { meta, config } = selected;

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  /**
   * Updates the default configuration for the storage resource based on the type.
   *
   * We have to do this to prevent React from warning us about uncontrolled vs. controlled elements.
   *
   * @param {Event} ev The change event on the input element.
   */
  const onTypeChange = function(ev) {
    let defaults = getDefaultsForType(ev.target.value);
    updateSelectedConfiguration({
      [ev.target.name]: ev.target.value,
      ...defaults
    });
  };

  const [error, caption] = validateName(config.id);

  return {
    type: meta.type,
    header: {
      icon: meta.type,
      title: {
        value: config.id,
        placeholder: 'UnnamedStorage',
        name: 'id',
        onChange,
        error,
        caption
      },
      inputs: [
        {
          type: 'select',
          name: 'type',
          value: selected.config.type,
          onChange: onTypeChange,
          options: [
            {
              name: 'Please select a storage type',
              value: ''
            },
            {
              name: 'Document',
              value: 'document'
            }
          ]
        }
      ]
    },
    tabs: getTabsForType(selected, onChange)
  };
}

function getTabsForType(selected, onChange) {
  switch (selected.config.type) {
    case 'document':
      return useDocumentStorageDetailTabs(selected, onChange);

    default:
      return [];
  }
}
