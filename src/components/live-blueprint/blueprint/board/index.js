import React, { useRef, useContext } from 'react';
import useDrop from '../../../../hooks/useDrop';
import BoardView from './view';
import LiveBlueprintContext from '../../context';

function Board() {
  const dropRef = useRef();
  const { state, onDrop } = useContext(LiveBlueprintContext);
  useDrop({
    ref: dropRef,
    onDrop: pkg => {
      onDrop({
        id: Math.random() * 10000000,
        x: pkg.targetOffsetX - pkg.sourceOffsetX,
        y: pkg.targetOffsetY - pkg.sourceOffsetY
      });
    }
  });
  return <BoardView ref={dropRef} functions={state.functions} />;
}

export default Board;
