import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from 'shared/components/ResourceDetails/DeleteIcon';

import actions from '../actions';

export default function useInternalEventDetails(resource) {
  const dispatch = useDispatch();
  const id = resource.id;

  return {
    id: id,
    type: 'internal-event',
    header: {
      icon: 'internal-event',
      title: {
        id: id + ':name',
        value: resource.name,
        placeholder: 'InternalEventName',
        name: 'name',
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
            title: 'General',
            inputs: [
              {
                type: 'validated-select',
                id: id + ':broker',
                name: 'broker',
                label: 'Broker',
                value: resource.broker,
                options: [
                  {
                    name: 'Please select a broker',
                    value: '',
                  },
                  {
                    name: 'Amazon SNS',
                    value: 'sns',
                  },
                ],
                error: resource._meta.errors.broker,
                onChange: useCallback(
                  (val) => {
                    dispatch(actions.update(id, 'broker', val));
                  },
                  [dispatch, id]
                ),
              },
            ],
          },
          {
            title: 'Topic',
            inputs: [
              {
                type: 'validated-text',
                id: id + ':topic',
                name: 'topic',
                label: 'Topic Name',
                value: resource.topic,
                error: resource._meta.errors.topic,
                onChangeEnd: useCallback(
                  (val) => {
                    dispatch(actions.update(id, 'topic', val));
                  },
                  [dispatch, id]
                ),
              },
            ],
          },
        ],
      },
    ],
  };
}
