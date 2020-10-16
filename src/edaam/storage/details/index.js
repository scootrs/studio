import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from 'shared/components/ResourceDetails/DeleteIcon';

import actions from '../actions';
import getKeyValueDetailTabs from './key-value';

export default function useStorageDetails(resource) {
  const dispatch = useDispatch();
  const id = resource.id;

  let tabs = [];
  switch (selected.config.type) {
    case 'keyval':
      tabs = getKeyValueDetailTabs(resource, dispatch);
  }

  return {
    id: id,
    type: 'storage',
    header: {
      icon: 'storage',
      title: {
        id: id + ':name',
        name: 'name',
        value: resource.name,
        placeholder: 'UnnamedStorage',
        error: resource._meta.errors.name,
        onChangeEnd: useCallback(
          (val) => {
            dispatch(actions.update(id, 'name', val));
          },
          [dispatch, id]
        ),
      },
      inputs: [
        {
          type: 'validated-select',
          id: id + ':type',
          name: 'type',
          value: resource.type,
          options: [
            {
              name: 'Please select a storage type',
              value: '',
            },
            {
              name: 'Key-Value',
              value: 'keyval',
            },
          ],
          error: resource._meta.errors.type,
          onChange: useCallback(
            (val) => {
              dispatch(actions.update(id, 'type', val));
            },
            [dispatch, id]
          ),
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
    tabs,
  };
}
