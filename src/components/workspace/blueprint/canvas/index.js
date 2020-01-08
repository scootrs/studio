import React, { useRef } from 'react';
import usePlumbContainer from 'react-plumb';
import uuid from 'uuid/v4';
import useDrop from '~hooks/useDrop';
import useWorkspaceContext from '~components/workspace/context';
import UtilityBar from './utility-bar';
import theme from '~styles/theme';
import BlueprintCanvasView from './view';
import ComputeBlueprintObject from './blueprint-object/compute';
import StorageBlueprintObject from './blueprint-object/storage';
import EventExternalBlueprintObject from './blueprint-object/event/external';
import EventInternalBlueprintObject from './blueprint-object/event/internal';

export default function BlueprintCanvas() {
  const {
    selected,
    objects,
    connections,
    actions: { addObject, removeObject, setSelected, addConnection, removeConnection }
  } = useWorkspaceContext();

  const selectedConnectionRef = useRef(null);

  const highlightSelectedConnection = () => {
    if (selectedConnectionRef.current !== null) {
      try {
        selectedConnectionRef.current.setPaintStyle({ stroke: theme.colors.secondary.main });
        selectedConnectionRef.current.endpoints.forEach(e => e.setPaintStyle({ fill: theme.colors.secondary.main }));
      } catch (err) {
        console.warn('Failed to highlight: ' + err.message);
        selectedConnectionRef.current = null;
      }
    }
  };

  const unhighlightSelectedConection = () => {
    if (selectedConnectionRef.current !== null) {
      try {
        selectedConnectionRef.current.setPaintStyle({ stroke: theme.colors.backgrounds.medium });
        selectedConnectionRef.current.endpoints.forEach(e =>
          e.setPaintStyle({ fill: theme.colors.backgrounds.medium })
        );
      } catch (err) {
        console.warn('Failed to unhighlight: ' + err.message);
        selectedConnectionRef.current = null;
      }
    }
  };

  const determineConnectionType = conn => {
    let source = objects[conn.source.id];
    let target = objects[conn.target.id];

    // If the source is any kind of event, we are dealing with a trigger that the user does not have to configure
    if (source.type === 'event-external' || source.type === 'event-internal') return 'trigger';

    // The only other kind of source is `compute`, so now we need to determine the target type to get our connection
    // type
    if (target.type === 'event-internal') return 'compute-to-event-internal';
    else return 'compute-to-storage';
  };

  const [ref, plumb] = usePlumbContainer({
    stopEvents: true,
    onConnect: function(conn, jsPlumbConn) {
      const type = determineConnectionType(conn);
      let shouldSelect = true;
      if (type !== 'trigger') {
        unhighlightSelectedConection();
        selectedConnectionRef.current = jsPlumbConn;
        highlightSelectedConnection();
      } else {
        shouldSelect = false;
      }
      addConnection(
        {
          type,
          config: {
            id: '',
            allows: ''
          },
          ...conn
        },
        shouldSelect
      );
    },
    onDisconnect: conn => {
      unhighlightSelectedConection();
      removeConnection(conn);
    },
    connectionHandlers: {
      onClick: function(conn, jsPlumbConn) {
        const type = determineConnectionType(conn);
        if (type !== 'trigger') {
          unhighlightSelectedConection();
          selectedConnectionRef.current = jsPlumbConn;
          highlightSelectedConnection();
          setSelected(connections[conn.id]);
        }
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

  const onRemove = id => {
    unhighlightSelectedConection();
    removeObject(id);
  };

  return (
    <BlueprintCanvasView
      ref={ref}
      onClick={onBlueprintClick}
      onDoubleClick={onBlueprintDoubleClick}
      UtilityBar={UtilityBar}
    >
      {plumb(
        Object.values(objects).map(o => {
          switch (o.type) {
            case 'compute':
              return <ComputeBlueprintObject key={o.id} id={o.id} object={o} onRemove={onRemove} />;

            case 'storage':
              return <StorageBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'event-external':
              return <EventExternalBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'event-internal':
              return <EventInternalBlueprintObject key={o.id} id={o.id} object={o} />;
          }
        })
      )}
    </BlueprintCanvasView>
  );
}
