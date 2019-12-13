import useWorkspaceContext from '~components/workspace/context';

export default function useEventDetails() {
  const {
    selected: { config, monitor },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  console.log('In event details:', monitor);

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  return {
    type: 'event',
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
                type: 'text',
                label: 'URI Path',
                name: 'path',
                value: config.path,
                onChange
              },
              {
                type: 'select',
                label: 'Method',
                name: 'method',
                value: config.method,
                onChange,
                options: [
                  {
                    name: 'Please select a method',
                    value: ''
                  },
                  {
                    name: 'GET',
                    value: 'GET'
                  },
                  {
                    name: 'POST',
                    value: 'POST'
                  },
                  {
                    name: 'PUT',
                    value: 'PUT'
                  },
                  {
                    name: 'DELETE',
                    value: 'DELETE'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: 'Monitor',
        sections: [
          {
            title: 'Deployment Information',
            inputs: [
              {
                type: 'text',
                label: 'URL',
                name: 'url',
                value: monitor.url
              }
            ]
          }
        ]
      }
    ]
  };
}
