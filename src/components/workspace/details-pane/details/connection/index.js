import { useWorkspaceContext } from '~contexts/workspace';
import { validateName } from '../validation';

export default function useConnectionDetails() {
  const {
    state: {
      selected: { meta, config }
    },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: meta.type,
    header: {
      icon: meta.type,
      title: {
        value: config.id,
        placeholder: 'UnnamedConnection',
        name: 'id',
        onChange,
        error,
        caption
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
                value: config.allows,
                onChange,
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
