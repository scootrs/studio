import React from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import Code from './code';
import { validateName } from '../validation';

export default function useComputeDetails() {
  const {
    state: {
      selected: { meta, config }
    },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const [error, caption] = validateName(config.id);

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  return {
    type: meta.type,
    header: {
      icon: meta.type,
      title: {
        value: config.id,
        name: 'id',
        onChange,
        error,
        caption,
        placeholder: 'UnnamedCompute'
      },
      inputs: [
        {
          type: 'select',
          name: 'runtime',
          value: config.runtime,
          onChange,
          options: [
            {
              name: 'Please select a runtime',
              value: ''
            },
            {
              name: 'Node.js | 12.x',
              value: 'nodejs12.x'
            }
          ]
        }
      ]
    },
    tabs: [
      {
        title: 'Code',
        component: <Code />
      },
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
            inputs: [
              {
                type: 'tabular',
                name: 'environment',
                label: 'Environment Variables',
                columns: [
                  {
                    type: 'text',
                    label: 'Name',
                    name: 'name',
                    value: ''
                  },
                  {
                    type: 'text',
                    label: 'Value',
                    name: 'value',
                    value: ''
                  }
                ],
                rows: config.environment,
                onAddRow: function(row) {
                  updateSelectedConfiguration({ environment: [...config.environment, row] });
                },
                onRemoveRow: function(row) {
                  updateSelectedConfiguration({
                    environment: config.environment.filter(function(e) {
                      return e.name !== row.name;
                    })
                  });
                },
                onUpdateRow: function(row, value) {
                  const enviroment = [...config.environment];
                  enviroment[row] = value;
                  updateSelectedConfiguration({ environment });
                }
              }
            ]
          }
        ]
      }
    ]
  };
}
