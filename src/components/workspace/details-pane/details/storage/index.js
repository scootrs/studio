import useWorkspaceContext from '~components/workspace/context';
import { validateName } from '../validation';

export default function useStorageDetails() {
  const {
    selected: { config },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: 'storage',
    title: {
      value: config.id,
      placeholder: 'UnnamedStorage',
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
                label: 'Table Name',
                name: 'table',
                value: config.table,
                onChange
              },
              {
                type: 'text',
                label: 'Primary Key Name',
                name: 'primaryName',
                value: config.primaryName,
                onChange
              },
              {
                type: 'select',
                label: 'Primary Key Type',
                name: 'primaryType',
                value: config.primaryType,
                onChange,
                options: [
                  {
                    name: 'Please select a type',
                    value: ''
                  },
                  {
                    name: 'String',
                    value: 'S'
                  },
                  {
                    name: 'Number',
                    value: 'N'
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
