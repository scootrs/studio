import { useCallback } from 'react';

import actions from '../actions';

function getKeyValueDetailTabs(resource, dispatch) {
  const id = resource.id;

  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'validated-select',
              id: id + ':engine',
              name: 'engine',
              label: 'Database Engine',
              value: resource.engine,
              options: [
                {
                  name: 'Please select an engine',
                  value: '',
                },
                {
                  name: 'DynamoDB',
                  value: 'dynamo-db',
                },
              ],
              error: resource._meta.errors.engine,
              onChange: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'engine', val));
                },
                [dispatch, id]
              ),
            },
          ],
        },
        {
          title: 'Collection',
          inputs: [
            {
              type: 'validated-text',
              id: id + ':collection',
              name: 'collection',
              label: 'Collection Name',
              value: resource.collection,
              error: resource._meta.errors.collection,
              onChangeEnd: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'collection', val));
                },
                [dispatch, id]
              ),
            },
            {
              type: 'validated-text',
              id: id + ':key-name',
              name: 'keyName',
              label: 'Primary Key Name',
              value: resource.keyName,
              error: resource._meta.errors.keyName,
              onChangeEnd: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'keyName', val));
                },
                [dispatch, id]
              ),
            },
            {
              type: 'validated-select',
              id: id + ':key-type',
              name: 'keyType',
              label: 'Primary Key Type',
              value: resource.keyType,
              options: [
                {
                  name: 'Please select a type',
                  value: '',
                },
                {
                  name: 'String',
                  value: 'S',
                },
                {
                  name: 'Number',
                  value: 'N',
                },
              ],
              error: resource._meta.errors.keyType,
              onChange: useCallback(
                (val) => {
                  dispatch(actions.update(id, 'keyType', val));
                },
                [dispatch, id]
              ),
            },
          ],
        },
      ],
    },
  ];
}

export default getKeyValueDetailTabs;
