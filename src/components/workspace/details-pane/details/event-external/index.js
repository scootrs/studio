import { useWorkspaceContext } from '~contexts/workspace';
import { validateId, validateType } from '~resources/event-external';
import { useHttpEventDetailTabs, defaults as httpDefaults } from './http';
import DeleteIcon from '../view/delete-icon';

export default function useEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration, removeResource }
  } = useWorkspaceContext();

  /**
   * Updates the default configuration for the external event based on the type.
   *
   * We have to do this to prevent React from warning us about uncontrolled vs. controlled elements.
   *
   * @param {Event} ev The change event on the input element.
   */
  const onTypeChange = function(ev) {
    const newValue = ev.target.value;
    let defaults = { config: {}, validation: {} };
    switch (newValue) {
      case 'http':
        defaults = httpDefaults;

      case '':
        break;

      default:
        throw new Error('Failed to get defaults for the external event: The type ' + type + ' is invalid');
    }
    updateSelectedConfiguration(
      {
        type: newValue,
        ...defaults.config
      },
      { type: validateType(newValue), ...defaults.validation }
    );
  };

  return {
    id: selected.meta.id,
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
        },
        {
          type: 'component',
          name: 'delete',
          component: DeleteIcon,
          props: {
            onClick: function() {
              // HACK: need a better way to unregister the node with jsPlumb
              document.unregisterNode(selected.meta.id);
              removeResource(selected.meta.id);
            }
          }
        }
      ]
    },
    tabs: getTabsForType(selected, updateSelectedConfiguration)
  };
}

function getTabsForType(selected, updateSelectedConfiguration) {
  switch (selected.config.type) {
    case 'http':
      return useHttpEventDetailTabs(selected, updateSelectedConfiguration);

    default:
      return [];
  }
}
