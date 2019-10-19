import React, { useState } from 'react';
import BlueprintItemView from './view';

function BlueprintItem({ x, y }) {
  const [state, setState] = useState({ x, y });
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

  return <BlueprintItemView x={state.x} y={state.y} onMouseDown={onMouseDown} />;
}

export default BlueprintItem;
