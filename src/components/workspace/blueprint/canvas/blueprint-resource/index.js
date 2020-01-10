import React, { useRef, useEffect } from 'react';
import { useWorkspaceContext } from '~contexts/workspace';
import View from './view';
import Resource from '~components/resources';

function BlueprintResource({ resource, onRemove }) {
  const ref = useRef();
  const {
    state: { selected },
    actions: { setSelected }
  } = useWorkspaceContext();

  const isSelected = selected && selected.meta.id === resource.meta.id;

  const onClick = ev => {
    ev.didSetSelected = true;
    ref.current.focus();
    setSelected(resource);
  };

  const onKeyPress = ev => {
    if (ev.key === 'Delete') {
      onRemove();
    }
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
      selected={isSelected}
      x={resource.meta.x}
      y={resource.meta.y}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      <Resource type={resource.meta.type} width={60} height={60} />
    </View>
  );
}

export default BlueprintResource;
