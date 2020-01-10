import { useWorkspaceContext } from '~contexts/workspace';
import { validateName } from '../validation';

export default function useStorageDetails() {
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
        placeholder: 'UnnamedStorage',
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
