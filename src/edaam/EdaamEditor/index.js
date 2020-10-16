import React, { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTheme } from 'styled-components';
import usePlumbContainer from 'react-plumb';

import useDrop from 'shared/hooks/useDrop';
import { applyThemeToEndpoints } from 'shared/styles/endpoints';
import selectors from 'edaam/selectors';
import HandlerResource from 'edaam/handler/HandlerResource';
import handlerActions from 'edaam/handler/actions';
import StorageResource from 'edaam/storage/StorageResource';
import storageActions from 'edaam/storage/actions';
import InternalEventResource from 'edaam/event/InternalEventResource';
import ExternalEventResource from 'edaam/event/ExternalEventResource';
import eventActions from 'edaam/event/actions';
import referenceActions from 'edaam/reference/actions';
import triggerActions from 'edaam/trigger/actions';

import EdaamEditorView from './view';
import ResourceLabel from './ResourceLabel';

function BlueprintCanvas({ theme }) {
  const dispatch = useDispatch();

  const handlers = useSelector(selectors.getHandlerResources);
  const storage = useSelector(selectors.getStorageResources);
  const events = useSelector(selectors.getEventResources);
  const triggers = useSelector(selectors.getTriggerConnections);
  const references = useSelector(selectors.getReferenceConnections);

  const [ref, plumb, unregister] = usePlumbContainer({
    // Prevent events from trickeling up the DOM and potentially causing side effects
    stopEvents: true,

    onConnect: useCallback(
      (conn, pconn) => {
        if (handlers[conn.source.id]) {
          dispatch(referenceActions.create(conn));
        } else {
          dispatch(triggerActions.create(conn));
        }
      },
      [dispatch, handlers]
    ),

    onDisconnect: useCallback(
      (conn) => {
        if (handlers[conn.source.id]) {
          dispatch(referenceActions.delete(conn.id));
        } else {
          dispatch(triggerActions.delete(conn.id));
        }
      },
      [dispatch, handlers]
    ),

    connectionHandlers: {
      onClick: useCallback((conn, pconn) => {
        if (handlers[conn.source.id]) {
          dispatch(referenceActions.select(conn.id));
        }
      }),
    },

    onDragStop: useCallback((id, x, y) => {
      if (handlers[id]) {
        dispatch(handlerActions.updatePosition(id, x, y));
      } else if (storage[id]) {
        dispatch(storageActions.updatePosition(id, x, y));
      } else {
        dispatch(eventActions.updatePosition(id, x, y));
      }
    }),

    createLabel: null,

    // Specified the property path to the jsPlumb information for our connections
    connectionPropPath: '_meta',

    // Keep track of our connections on rerenders
    connections: Object.values({ ...triggers, ...references }),

    // Drag by 10 pixels
    dragGrid: [10, 10],
  });

  useDrop({
    ref,
    svg: true,
    onDrop: useCallback(
      (pkg) => {
        switch (pkg.data.type) {
          case 'handler':
            dispatch(handlerActions.create(pkg));
            break;

          case 'storage':
            dispatch(storageActions.create(pkg));
            break;

          case 'internal-event':
          case 'external-event':
            dispatch(eventActions.create(pkg.data.type, pkg));
            break;
        }
      },
      [dispatch]
    ),
  });

  return (
    <EdaamEditorView ref={ref}>
      {plumb(
        Object.values(handlers).map((r) => <HandlerResource id={r._meta.id} resource={r} />),
        Object.values(storage).map((r) => <StorageResource id={r._meta.id} resource={r} />),
        Object.values(events).map((r) => {
          if (r.subclass === 'internal') {
            return <InternalEventResource id={r._meta.id} resource={r} />;
          } else {
            return <ExternalEventResource id={r._meta.id} resource={r} />;
          }
        })
      )}
    </EdaamEditorView>
  );
}

export default withTheme(BlueprintCanvas);
