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
      console.log(pkg);
      onDrop({
        id: Math.random() * 10000000,
        x: pkg.x,
        y: pkg.y
      });
    },
    svg: true
  });
  return <BoardView ref={dropRef} functions={state.compute} />;
}

export default Board;
