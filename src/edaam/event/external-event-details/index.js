import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from 'shared/components/ResourceDetails/DeleteIcon';

import actions from '../actions';
import getHttpEventDetailTabs from './http';

function useExternalEventDetails(resource) {
  const dispatch = useDispatch();
  const id = resource.id;

  // Determine the type of the external event. This will determine which tabs we should display
  let tabs = [];
  switch (resource.type) {
    case 'http':
      tabs = getHttpEventDetailTabs(resource, dispatch);
      break;

    case '':
      // No type selected
      break;

    default:
      throw new Error('Failed to get tabs for external event of invalid type ' + type);
  }

  return {
    id: resource.id,
    type: 'external-event',
    header: {
      icon: 'external-event',
      title: {
        id: resource.id + ':name',
        name: 'name',
        value: resource.name,
        placeholder: 'ExternalEventName',
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
          id: resource.id + ':type',
          name: 'type',
          value: resource.type,
          onChange: useCallback(
            (val) => {
              dispatch(actions.update(id, 'type', val));
            },
            [dispatch, id]
          ),
          options: [
            {
              name: 'Please select an event type',
              value: '',
            },
            {
              name: 'HTTP',
              value: 'http',
            },
          ],
          error: resource._meta.errors.type,
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

export default useExternalEventDetails;
