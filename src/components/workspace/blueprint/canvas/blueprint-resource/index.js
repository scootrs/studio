import React, { useRef, useEffect, useState } from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import Resource from '~components/resources';
import View from './view';
import ResourceContextMenu from './context-menu';

function BlueprintResource({ resource, onRemove, onContextMenu }) {
  const ref = useRef();
  const {
    state: { selected },
    actions: { setSelected }
  } = useWorkspaceContext();

  const isSelected = selected && selected.meta.id === resource.meta.id;

  // We need something to coordinate between the click and the context menu
  const didRemoveFromContextMenuRef = useRef(false);

  const onClick = ev => {
    if (didRemoveFromContextMenuRef.current) {
      didRemoveFromContextMenuRef.current = false;
      return;
    }
    ev.didSetSelected = true;
    ref.current.focus();
    setSelected(resource);
  };

  const onKeyPress = ev => {
    if (ev.key === 'Delete') {
      onRemove();
    }
  };

  const [contextMenuState, setContextMenuState] = useState({
    x: 0,
    y: 0,
    isShowing: false
  });

  const contextMenuActions = [
    {
      name: 'Remove',
      action: function() {
        didRemoveFromContextMenuRef.current = true;
        onRemove();
      }
    }
  ];

  const onResourceContextMenu = function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    setContextMenuState({
      x: ev.nativeEvent.offsetX + 15,
      y: ev.nativeEvent.offsetY,
      isShowing: true
    });
    const dispose = function() {
      setContextMenuState({
        x: 0,
        y: 0,
        isShowing: false
      });
    };
    onContextMenu(dispose);
  };

  useEffect(() => {
    if (isSelected) {
      ref.current.focus();
    }
  }, []);

  return (
    <View
      ref={ref}
      id={resource.meta.id}
      name={resource.config.id}
      selected={isSelected}
      x={resource.meta.x}
      y={resource.meta.y}
      onClick={onClick}
      onKeyPress={onKeyPress}
      onContextMenu={onResourceContextMenu}
      isValid={resource.validation.isValid}
    >
      <Resource type={resource.meta.type} width={60} height={60} />
      <ResourceContextMenu
        x={contextMenuState.x}
        y={contextMenuState.y}
        isShowing={contextMenuState.isShowing}
        actions={contextMenuActions}
      />
    </View>
  );
}

export default BlueprintResource;
