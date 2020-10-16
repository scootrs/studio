import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from 'shared/components/ResourceDetails/DeleteIcon';

import actions from '../actions';

export default function useReferenceDetails(resource) {
  const dispatch = useDispatch();
  const id = resource.id;

  return {
    id: id,
    type: 'reference',
    header: {
      icon: 'reference',
      title: {
        id: id + ':name',
        name: 'name',
        value: resource.name,
        placeholder: 'ReferenceName',
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
        title: 'Configuration',
        sections: [
          {
            title: 'Permissions',
            inputs: [
              {
                id: id + ':permissions',
                type: 'validated-select',
                label: 'Permissions',
                name: 'permissions',
                value: resource.permissions,
                error: resource._meta.errors.permissions,
                onChange: useCallback(
                  (val) => {
                    dispatch(actions.update(id, 'permissions', [val]));
                  },
                  [dispatch, id]
                ),
                options: [
                  {
                    name: 'Please select an action',
                    value: '',
                  },
                  {
                    name: 'Create',
                    value: 'create',
                  },
                  {
                    name: 'Read',
                    value: 'read',
                  },
                  {
                    name: 'Update',
                    value: 'update',
                  },
                  {
                    name: 'Delete',
                    value: 'delete',
                  },
                  {
                    name: 'All',
                    value: '*',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}
