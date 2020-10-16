import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ResourceView from 'shared/components/ResourceView';
import { freeze } from 'shared/util/dom-events';

import InternalEventSvg from './internal-event.svg';
import selectors from './selectors';
import actions from './actions';

function InternalEventResource({ resource }) {
  const ref = useRef();
  const dispatch = useDispatch();

  const id = resource.id;

  const isSelected = useSelector(selectors.getIsSelected(id));
  const isValid = useSelector(selectors.getIsValid(id));

  const onClick = useCallback(
    (ev) => {
      freeze(ev);
      ref.current.focus();
      dispatch(actions.select(id));
    },
    [dispatch, id, ref]
  );

  const onKeyPress = useCallback(
    (ev) => {
      freeze(ev);
      if (ev.key === 'Delete') {
        dispatch(actions.delete(id));
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (isSelected) {
      ref.current.focus();
    }
  }, []);

  return (
    <ResourceView
      ref={ref}
      metaId={resource._meta.id}
      name={resource.name}
      x={resource._meta.position.x}
      y={resource._meta.position.y}
      isValid={isValid}
      isSelected={isSelected}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <InternalEventSvg width={40} height={40} />
    </ResourceView>
  );
}

export default InternalEventResource;
