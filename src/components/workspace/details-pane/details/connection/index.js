import useWorkspaceContext from '~components/workspace/context';

export default function useConnectionDetails() {
  const {
    selected: { config },
    actions: { setSelectedConnectionConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedConnectionConfig({ [ev.target.name]: ev.target.value });

  return {
    type: 'connection',
    title: {
      value: config.id,
      name: 'id',
      onChange
    },
    tabs: [
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
            inputs: [
              {
                type: 'select',
                label: 'Allowed Methods',
                name: 'allows',
                value: config.allows,
                onChange,
                options: [
                  {
                    name: 'Please select a method',
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
