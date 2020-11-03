import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from 'shared/components/ResourceDetails/DeleteIcon';

import actions from '../actions';
import CodeEditor from './CodeEditor';
import LogViewer from './LogViewer';

export default function useComputeDetails(resource) {
  const dispatch = useDispatch();
  const id = resource.id;
  const environment = resource.environment;

  return {
    id: id,
    type: 'handler',
    header: {
      icon: 'handler',
      title: {
        id: id + ':name',
        name: 'name',
        value: resource.name,
        placeholder: 'HandlerName',
        onChangeEnd: useCallback(
          (val) => {
            dispatch(actions.update(id, 'name', val));
          },
          [dispatch, id]
        ),
        error: resource._meta.errors.name,
      },
      inputs: [
        {
          type: 'validated-select',
          id: id + ':runtime',
          name: 'runtime',
          value: resource.runtime,
          options: [
            {
              name: 'Please select a runtime',
              value: '',
            },
            {
              name: 'Node.js | 12.x',
              value: 'nodejs12.x',
            },
            {
              name: 'Python | 3.8',
              value: 'python3.8',
            },
          ],
          onChange: useCallback(
            (val) => {
              dispatch(actions.update(id, 'runtime', val));
            },
            [dispatch, id]
          ),
          error: resource._meta.errors.runtime,
        },
        {
          type: 'component',
          name: 'delete',
          component: DeleteIcon,
          props: {
            onClick: useCallback(() => {
              dispatch(actions.delete(id));
            }, [dispatch, id]),
          },
        },
      ],
    },
    tabs: [
      {
        title: 'Code',
        component: <CodeEditor resource={resource} />,
      },
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
            inputs: [
              {
                type: 'tabular',
                id: id + ':environment',
                name: 'environment',
                label: 'Environment Variables',
                columns: [
                  {
                    type: 'text',
                    label: 'Name',
                    name: 'name',
                    value: '',
                  },
                  {
                    type: 'text',
                    label: 'Value',
                    name: 'value',
                    value: '',
                  },
                ],
                rows: environment,
                onAddRow: useCallback(
                  (row) => {
                    dispatch(actions.update(id, 'environment', [...environment, row]));
                  },
                  [dispatch, id, environment]
                ),
                onRemoveRow: useCallback(
                  (row) => {
                    const env = environment.filter((e) => e.name !== row.name);
                    dispatch(actions.update(id, 'environment', env));
                  },
                  [dispatch, id, environment]
                ),
                onUpdateRow: useCallback(
                  (index, values) => {
                    environment[index] = values;
                    dispatch(actions.update(id, 'environment', environment));
                  },
                  [dispatch, id, environment]
                ),
              },
            ],
          },
        ],
      },
      {
        title: 'Logs',
        component: <LogViewer resourceId={id} />,
      },
    ],
  };
}
