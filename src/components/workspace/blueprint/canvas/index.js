import React, { useRef } from 'react';
import { withTheme } from 'styled-components';
import usePlumbContainer from 'react-plumb';
import useDrop from '~hooks/useDrop';
import { useWorkspaceContext } from '~contexts/workspace';
import { createResourceWithType } from '~resources/';
import { EventInternal, EventExternal, Trigger, Reference } from '~types';
import { createConnectionWithType } from '~connections/';
import UtilityBar from './utility-bar';
import BlueprintCanvasView from './view';
import BlueprintResource from './blueprint-resource';
import Label from './label';
import { applyThemeToEndpoints } from '~resources/endpoints';

function BlueprintCanvas({ theme }) {
  const {
    state: { selected, resources, connections },
    actions: { addResource, updateResourcePosition, removeResource, setSelected, addConnection, removeConnection }
  } = useWorkspaceContext();

  const currentlySelectedConnectionRef = useRef(null);
  const currentlySelectedOldConnectionPaintStyleRef = useRef(null);
  const currentlySelectedOldEndpointPaintStyleRef = useRef(null);

  const unhighlightSelectedConnection = function() {
    if (currentlySelectedConnectionRef.current !== null) {
      currentlySelectedConnectionRef.current.setPaintStyle(currentlySelectedOldConnectionPaintStyleRef.current);
      for (let e of currentlySelectedConnectionRef.current.endpoints) {
        e.setPaintStyle(currentlySelectedOldEndpointPaintStyleRef.current);
      }
      currentlySelectedConnectionRef.current = null;
      currentlySelectedOldConnectionPaintStyleRef.current = null;
      currentlySelectedOldEndpointPaintStyleRef.current = null;
    }
  };

  const highlightConnection = function(conn) {
    unhighlightSelectedConnection();

    currentlySelectedOldConnectionPaintStyleRef.current = conn.getPaintStyle();
    conn.setPaintStyle({ ...currentlySelectedOldConnectionPaintStyleRef.current, stroke: theme.colors.secondary.main });
    for (let e of conn.endpoints) {
      if (currentlySelectedOldEndpointPaintStyleRef.current === null) {
        currentlySelectedOldEndpointPaintStyleRef.current = e.getPaintStyle();
      }
      e.setPaintStyle({ fill: theme.colors.secondary.main });
    }
    currentlySelectedConnectionRef.current = conn;
  };

  const determineConnectionType = function(conn) {
    let sourceType = resources[conn.source.id].meta.type;
    if (sourceType === EventInternal || sourceType === EventExternal) return Trigger;
    else return Reference;
  };

  const newConnectionRef = useRef(false);

  const [ref, plumb] = usePlumbContainer({
    // Prevent events from trickeling up the DOM and potentially causing side effects
    stopEvents: true,

    onConnect: function(conn, jsPlumbConn) {
      const type = determineConnectionType(conn);
      let shouldSelect = true;
      if (type !== Trigger) {
        highlightConnection(jsPlumbConn);
      } else {
        shouldSelect = false;
      }
      let newConnection = createConnectionWithType(type, conn);
      addConnection(newConnection, shouldSelect);
      newConnectionRef.current = true;
      // HACK: trying to get new connections to not trigger a blueprint on click event
      setTimeout(function() {
        newConnectionRef.current = false;
      }, 1000);
    },

    onDisconnect: function(conn) {
      if (selected && selected.meta.id === conn.id) {
        unhighlightSelectedConnection();
      }
      removeConnection(conn.id);
    },

    connectionHandlers: {
      onClick: function(conn, jsPlumbConn) {
        const type = determineConnectionType(conn);
        if (type !== Trigger) {
          highlightConnection(jsPlumbConn);
          setSelected(conn.id);
        }
      }
    },

    onDragStop: function(id, x, y) {
      updateResourcePosition(id, x, y);
    },

    createLabel: function(id, jsPlumbConn) {
      let content = '';
      let isValid = false;
      let isSelected = false;
      if (connections[id]) {
        content = connections[id].config.id;
        isValid = connections[id].validation.isValid;
      }
      if (selected && selected.meta.id === id) {
        isSelected = true;
      }

      const onClick = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        highlightConnection(jsPlumbConn);
        setSelected(id);
      };

      return <Label content={content} isValid={isValid} theme={theme} isSelected={isSelected} onClick={onClick} />;
    },

    // Specified the property path to the jsPlumb information for our connections
    connectionPropPath: 'meta',

    // Keep track of our connections on rerenders
    connections: Object.values(connections),

    // Drag by 10 pixels
    dragGrid: [10, 10]
  });

  useDrop({
    ref,
    svg: true,
    onDrop: function(pkg) {
      unhighlightSelectedConnection();
      const resource = createResourceWithType(pkg.data.type, pkg.x, pkg.y);
      addResource(resource);
    }
  });

  const contextMenuDisposeRef = useRef(null);

  const onBlueprintCanvasContextMenu = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  };

  const onBlueprintClick = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    // Cover clicking when a context menu is visible
    //
    if (contextMenuDisposeRef.current !== null) {
      contextMenuDisposeRef.current();
      contextMenuDisposeRef.current = null;
      return;
    }

    // Cover the edge case where dropping a new connection triggers this handler
    //
    if (newConnectionRef.current === true) {
      newConnectionRef.current = false;
      return;
    }

    unhighlightSelectedConnection();
    setSelected(null);
  };

  const onRemove = id => {
    if (currentlySelectedConnectionRef.current !== null) {
      unhighlightSelectedConnection();
    }
    removeResource(id);
  };

  const onSelectResource = function() {
    if (currentlySelectedConnectionRef.current !== null) {
      unhighlightSelectedConnection();
    }
  };

  const onContextMenu = function(dispose) {
    if (contextMenuDisposeRef.current !== null) {
      contextMenuDisposeRef.current();
    }
    contextMenuDisposeRef.current = dispose;
  };

  return (
    <BlueprintCanvasView
      ref={ref}
      onClick={onBlueprintClick}
      UtilityBar={UtilityBar}
      onContextMenu={onBlueprintCanvasContextMenu}
    >
      {plumb(
        Object.values(resources).map(r => (
          <BlueprintResource
            key={r.meta.id}
            id={r.meta.id}
            resource={r}
            onRemove={onRemove}
            onContextMenu={onContextMenu}
            endpoints={applyThemeToEndpoints(r.meta.endpoints, theme)}
            onSelect={onSelectResource}
          />
        ))
      )}
    </BlueprintCanvasView>
  );
}

export default withTheme(BlueprintCanvas);
