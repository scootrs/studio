import { useWorkspaceContext } from '~contexts/workspace';
import { validateId, validateTopicName } from '~resources/event-internal';

export default function useInternalEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  return {
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
      inputs: []
    },
    tabs: [
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
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
