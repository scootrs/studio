import React, { useCallback } from 'react';

import actions from '../actions';
import HttpEventTestPane from './HttpEventTestPane';

function getHttpEventDetailTabs(resource, dispatch) {
  const id = resource.id;

  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'validated-text',
              id: id + ':path',
              label: 'URL Path',
              name: 'path',
              value: resource.path,
              error: resource._meta.error.type,
              onChangeEnd: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'path', val));
                },
                [dispatch, id]
              ),
            },
            {
              type: 'validated-select',
              id: id + ':method',
              label: 'Method',
              name: 'method',
              value: resource.method,
              options: [
                {
                  name: 'Please select a method',
                  value: '',
                },
                {
                  name: 'GET',
                  value: 'get',
                },
                {
                  name: 'POST',
                  value: 'post',
                },
                {
                  name: 'PUT',
                  value: 'put',
                },
                {
                  name: 'DELETE',
                  value: 'delete',
                },
              ],
              error: resource._meta.errors.method,
              onChange: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'method', val));
                },
                [dispatch, id]
              ),
            },
          ],
        },
      ],
    },
    {
      title: 'Test',
      component: <HttpEventTestPane resource={resource} />,
    },
  ];
}

export default getHttpEventDetailTabs;
