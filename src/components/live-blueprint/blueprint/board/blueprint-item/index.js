import React, { useState } from 'react';
import Item from './view';
import Object from '../../../../objects';

function BlueprintItem({ item }) {
  const [state, setState] = useState({ x: item.x, y: item.y });
  const onMouseDown = ev => {
    setState(prev => ({ ...prev }));
    document.onmousemove = ev => {
      setState(prev => ({
        x: prev.x + ev.movementX,
        y: prev.y + ev.movementY
      }));
    };
    document.onmouseup = ev => {
      document.onmousemove = null;
      document.onmouseup = null;
      setState(prev => ({ x: prev.x, y: prev.y }));
    };
  };

  return (
    <Item x={state.x} y={state.y} onMouseDown={onMouseDown}>
      <Object type={item.data.type} />
    </Item>
  );
}

export default BlueprintItem;
