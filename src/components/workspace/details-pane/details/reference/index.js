import { useWorkspaceContext } from '~contexts/workspace';
import { validateId } from '~connections/reference';

export default function useConnectionDetails() {
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
        name: 'id',
        value: selected.config.id,
        placeholder: 'ReferenceName',
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
            title: 'Permissions',
            inputs: [
              {
                type: 'select',
                label: 'Allowed Actions',
                name: 'allows',
                value: selected.config.allows,
                onChange: function(ev) {
                  updateSelectedConfiguration({ allows: ev.target.value });
                },
                options: [
                  {
                    name: 'Please select an action',
                    value: ''
                  },
                  {
                    name: 'Create',
                    value: 'create'
                  },
                  {
                    name: 'Read',
                    value: 'read'
                  },
                  {
                    name: 'Update',
                    value: 'update'
                  },
                  {
                    name: 'Delete',
                    value: 'delete'
                  },
                  {
                    name: 'All',
                    value: '*'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };
}
