import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import Code from './code';

export default function useComputeDetails() {
  const {
    selected: { config },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  return {
    type: 'compute',
    title: {
      value: config.id,
      name: 'id',
      onChange: ev => setSelectedObjectConfig({ id: ev.target.value })
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
                label: 'Runtime',
                name: 'runtime',
                value: config.runtime,
                onChange: ev => setSelectedObjectConfig({ runtime: ev.target.value }),
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
          }
        ]
      },
      {
        title: 'Code',
        component: <Code />
      }
    ]
  };
}
