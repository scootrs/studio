import { useWorkspaceContext } from '~contexts/workspace';
import { validateId, validateAllows } from '~connections/reference';
import DeleteIcon from '../view/delete-icon';

export default function useReferenceDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration, removeConnection }
  } = useWorkspaceContext();

  return {
    id: selected.meta.id,
    id: selected.meta.id,
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
              removeConnection(selected.meta.id);
              // HACK: need a better way to do this
              document.unhighlightSelectedConnection();
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
            title: 'Permissions',
            inputs: [
              {
                type: 'validated-select',
                label: 'Allowed Actions',
                name: 'allows',
                value: selected.config.allows,
                onChange: function(ev) {
                  const newValue = ev.target.value;
                  updateSelectedConfiguration({ allows: newValue }, { allows: validateAllows(newValue) });
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
                ],
                isValid: selected.validation.fields.allows === '',
                caption: selected.validation.fields.allows
              }
            ]
          }
        ]
      }
    ]
  };
}
