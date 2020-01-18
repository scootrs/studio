import { useWorkspaceContext } from '~contexts/workspace';
import { validateId, validateType } from '~resources/event-external';
import useHttpEventDetailTabs from './http';
import { getDefaultsForType } from './defaults';

export default function useEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  /**
   * Updates the default configuration for the external event based on the type.
   *
   * We have to do this to prevent React from warning us about uncontrolled vs. controlled elements.
   *
   * @param {Event} ev The change event on the input element.
   */
  const onTypeChange = function(ev) {
    const newValue = ev.target.value;
    let defaults = getDefaultsForType(newValue);
    updateSelectedConfiguration(
      {
        type: newValue,
        ...defaults
      },
      { type: validateType(newValue) }
    );
  };

  return {
    type: selected.meta.type,
    header: {
      icon: selected.meta.type,
      title: {
        id: selected.meta.id,
        name: 'id',
        value: selected.config.id,
        placeholder: 'ExternalEventName',
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
          onChange: onTypeChange,
          options: [
            {
              name: 'Please select an event type',
              value: ''
            },
            {
              name: 'HTTP',
              value: 'http'
            }
          ],
          isValid: selected.validation.fields.type === '',
          caption: selected.validation.fields.type
        }
      ]
    },
    tabs: getTabsForType(selected, onChange)
  };
}

function getTabsForType(selected, onChange) {
  switch (selected.config.type) {
    case 'http':
      return useHttpEventDetailTabs(selected, onChange);

    default:
      return [];
  }
}
