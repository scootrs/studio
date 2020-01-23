import React from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import Code from './code';
import { validateId, validateRuntime } from '~resources/compute';

export default function useComputeDetails() {
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
        placeholder: 'ComputeName',
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
          type: 'validated-select',
          name: 'runtime',
          value: selected.config.runtime,
          onChange: function(ev) {
            const error = validateRuntime(ev.target.value);
            updateSelectedConfiguration({ runtime: ev.target.value }, { runtime: error });
          },
          options: [
            {
              name: 'Please select a runtime',
              value: ''
            },
            {
              name: 'Node.js | 12.x',
              value: 'nodejs12.x'
            },
            {
              name: 'Python | 3.8',
              value: 'python3.8'
            }
          ],
          isValid: selected.validation.fields.runtime === '',
          caption: selected.validation.fields.runtime
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
                rows: selected.config.environment,
                onAddRow: function(row) {
                  updateSelectedConfiguration({ environment: [...selected.config.environment, row] });
                },
                onRemoveRow: function(row) {
                  updateSelectedConfiguration({
                    environment: selected.config.environment.filter(function(e) {
                      return e.name !== row.name;
                    })
                  });
                },
                onUpdateRow: function(row, value) {
                  const enviroment = [...selected.config.environment];
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
