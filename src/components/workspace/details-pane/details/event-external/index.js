import useWorkspaceContext from '~components/workspace/context';
import { validateName } from '../validation';

export default function useEventDetails() {
  const {
    selected: { config, monitor },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: 'event-external',
    title: {
      value: config.id,
      placeholder: 'UnnamedExternalEvent',
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
