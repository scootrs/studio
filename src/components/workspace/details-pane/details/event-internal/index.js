import { useWorkspaceContext } from '~contexts/workspace';
import { validateId } from '~resources/event-internal';

export default function useInternalEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

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
        seedIsValid: selected.validation.isValid,
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
                type: 'text',
                label: 'Topic Name',
                name: 'name',
                value: selected.config.name,
                onChange
              }
            ]
          }
        ]
      }
    ]
  };
}
