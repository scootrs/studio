import React, { useRef } from 'react';
import usePlumbContainer from 'react-plumb';
import uuid from 'uuid/v4';
import useDrop from '~hooks/useDrop';
import useWorkspaceContext from '~components/workspace/context';
import theme from '~styles/theme';
import BlueprintCanvasView from './view';
import ComputeBlueprintObject from './blueprint-object/compute';
import StorageBlueprintObject from './blueprint-object/storage';
import EventBlueprintObject from './blueprint-object/event';

export default function BlueprintCanvas() {
  const {
    selected,
    objects,
    connections,
    actions: { addObject, setSelected, addConnection, removeConnection }
  } = useWorkspaceContext();

  const selectedConnectionRef = useRef(null);

  const highlightSelectedConnection = () => {
    if (selectedConnectionRef.current !== null) {
      selectedConnectionRef.current.setPaintStyle({ stroke: theme.colors.secondary.main });
      selectedConnectionRef.current.endpoints.forEach(e => e.setPaintStyle({ fill: theme.colors.secondary.main }));
    }
  };

  const unhighlightSelectedConection = jsPlumbCon => {
    if (selectedConnectionRef.current !== null) {
      selectedConnectionRef.current.setPaintStyle({ stroke: theme.colors.backgrounds.medium });
      selectedConnectionRef.current.endpoints.forEach(e => e.setPaintStyle({ fill: theme.colors.backgrounds.medium }));
    }
  };

  const [ref, plumb] = usePlumbContainer({
    stopEvents: true,
    onConnect: (conn, jsPlumbConn) => {
      unhighlightSelectedConection();
      selectedConnectionRef.current = jsPlumbConn;
      highlightSelectedConnection();
      addConnection({
        type: 'connection',
        config: {
          id: '',
          allows: ''
        },
        ...conn
      });
    },
    onDisconnect: conn => {
      unhighlightSelectedConection();
      removeConnection(conn);
    },
    connectionHandlers: {
      onClick: (conn, jsPlumbConn) => {
        unhighlightSelectedConection();
        selectedConnectionRef.current = jsPlumbConn;
        highlightSelectedConnection();
        setSelected(connections[conn.id]);
      }
    },
    connections: Object.values(connections)
  });

  useDrop({
    ref,
    onDrop: pkg => {
      unhighlightSelectedConection();
      addObject({
        id: uuid(),
        x: pkg.x,
        y: pkg.y,
        ...pkg.data
      });
    },
    svg: true
  });

  const onBlueprintClick = ev => {
    if (ev.didSetSelected) {
      ev.preventDefault();
      ev.stopPropagation();
      unhighlightSelectedConection();
    }
    ev.didSetSelected = false;
  };

  const onBlueprintDoubleClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (selectedConnectionRef.current) {
      unhighlightSelectedConection();
      selectedConnectionRef.current = null;
    }
    if (selected && !ev.didSetSelected) {
      setSelected(null);
    }
    ev.didSetSelected = false;
  };

  return (
    <BlueprintCanvasView ref={ref} onClick={onBlueprintClick} onDoubleClick={onBlueprintDoubleClick}>
      {plumb(
        Object.values(objects).map(o => {
          switch (o.type) {
            case 'compute':
              return <ComputeBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'storage':
              return <StorageBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'event':
              return <EventBlueprintObject key={o.id} id={o.id} object={o} />;
          }
        })
      )}
    </BlueprintCanvasView>
  );
}
