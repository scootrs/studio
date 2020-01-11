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
              value: 'nodejs@12.x'
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
            inputs: []
          }
        ]
      }
    ]
  };
}
