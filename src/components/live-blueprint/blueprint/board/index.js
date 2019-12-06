import React, { useRef, useContext } from 'react';
import useDrop from '../../../../hooks/useDrop';
import BoardView from './view';
import BlueprintItem from './blueprint-item';
import LiveBlueprintContext from '../../context';

function Board() {
  const dropRef = useRef();
  const { state, onDrop } = useContext(LiveBlueprintContext);
  useDrop({
    ref: dropRef,
    onDrop: pkg => {
      onDrop({
        id: Math.floor(Math.random() * 10000000),
        x: pkg.x,
        y: pkg.y,
        data: pkg.data
      });
    },
    svg: true
  });
  return (
    <BoardView ref={dropRef}>
      {Object.values(state.computeObjects).map(c => (
        <BlueprintItem key={c.id} item={c} />
      ))}
      {Object.values(state.storageObjects).map(s => (
        <BlueprintItem key={s.id} item={s} />
      ))}
      {Object.values(state.eventObjects).map(e => (
        <BlueprintItem key={e.id} item={e} />
      ))}
    </BoardView>
  );
}

export default Board;
