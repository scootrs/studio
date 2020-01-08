import useWorkspaceContext from '~components/workspace/context';
import { validateName } from '../validation';

export default function useConnectionDetails() {
  const {
    selected: { config },
    actions: { setSelectedConnectionConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedConnectionConfig({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: config.type,
    title: {
      value: config.id,
      placeholder: 'UnnamedConnection',
      name: 'id',
      onChange,
      error,
      caption
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
