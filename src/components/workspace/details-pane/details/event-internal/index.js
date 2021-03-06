import { useWorkspaceContext } from '~contexts/workspace';
import { validateId, validateTopicName, validateBroker } from '~resources/event-internal';
import DeleteIcon from '../view/delete-icon';

export default function useInternalEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration, removeResource }
  } = useWorkspaceContext();

  return {
    id: selected.meta.id,
    type: selected.meta.type,
    header: {
      icon: selected.meta.type,
      title: {
        id: selected.meta.id,
        value: selected.config.id,
        placeholder: 'InternalEventName',
        name: 'id',
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
    tabs: [
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
            inputs: [
              {
                type: 'validated-select',
                label: 'Broker',
                name: 'broker',
                value: selected.config.broker,
                options: [
                  {
                    name: 'Please select a broker',
                    value: ''
                  },
                  {
                    name: 'Amazon SNS',
                    value: 'sns'
                  }
                ],
                onChange: function(event) {
                  const newValue = event.target.value;
                  updateSelectedConfiguration({ broker: newValue }, { broker: validateBroker(newValue) });
                },
                onValidate: function(val) {
                  return validateBroker(val);
                },
                isValid: selected.validation.fields.broker === '',
                caption: selected.validation.fields.broker
              }
            ]
          },
          {
            title: 'Topic',
            inputs: [
              {
                type: 'validated-text',
                label: 'Topic Name',
                name: 'name',
                value: selected.config.name,
                onChangeEnd: function(val, error) {
                  updateSelectedConfiguration({ name: val }, { name: error });
                },
                onValidate: function(val) {
                  return validateTopicName(val);
                },
                seedIsValid: selected.validation.fields.name === '',
                seedCaption: selected.validation.fields.name
              }
            ]
          }
        ]
      }
    ]
  };
}
