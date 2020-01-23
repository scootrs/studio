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

  const selectedRef = useRef(null);

  const highlightSelected = function() {
    if (selectedRef.current !== null) {
      try {
        selectedRef.current.setPaintStyle({ stroke: theme.colors.secondary.main });
        selectedRef.current.endpoints.forEach(e => e.setPaintStyle({ fill: theme.colors.secondary.main }));
      } catch (err) {
        console.warn('Failed to highlight: ' + err.message);
        selectedRef.current = null;
      }
    }
  };

  const unhighlightSelected = function() {
    if (selectedRef.current !== null) {
      try {
        selectedRef.current.setPaintStyle({ stroke: theme.colors.backgrounds.medium });
        selectedRef.current.endpoints.forEach(function(e) {
          e.setPaintStyle({ fill: theme.colors.backgrounds.medium });
        });
      } catch (err) {
        console.warn('Failed to unhighlight: ' + err.message);
        selectedRef.current = null;
      }
    }
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
        unhighlightSelected();
        selectedRef.current = jsPlumbConn;
        highlightSelected();
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
        unhighlightSelected();
      }
      removeConnection(conn.id);
    },

    connectionHandlers: {
      onClick: function(conn, jsPlumbConn) {
        const type = determineConnectionType(conn);
        if (type !== Trigger) {
          unhighlightSelected();
          selectedRef.current = jsPlumbConn;
          highlightSelected();
          setSelected(connections[conn.id]);
        }
      }
    },

    onDragStop: function(id, x, y) {
      updateResourcePosition(id, x, y);
    },

    createLabel: function(id) {
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
      return <Label content={content} isValid={isValid} theme={theme} isSelected={isSelected} />;
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
      unhighlightSelected();
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
    if (contextMenuDisposeRef.current !== null) {
      contextMenuDisposeRef.current();
      contextMenuDisposeRef.current = null;
    }
    if (newConnectionRef.current === true) {
      newConnectionRef.current = false;
      return;
    }
    if (ev.didSetSelected) {
      unhighlightSelected();
    } else {
      if (selectedRef.current) {
        unhighlightSelected();
        selectedRef.current = null;
      }
      if (selected && !ev.didSetSelected) {
        setSelected(null);
      }
    }
    ev.didSetSelected = false;
  };

  const onRemove = id => {
    unhighlightSelected();
    removeResource(id);
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
          />
        ))
      )}
    </BlueprintCanvasView>
  );
}

export default withTheme(BlueprintCanvas);
