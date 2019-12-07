import React, { useContext } from 'react';
import useDrop from '../../../hooks/useDrop';
import BoardView from './view';
import ComputeBlueprintObject from './blueprint-object/compute';
import StorageBlueprintObject from './blueprint-object/storage';
import EventBlueprintObject from './blueprint-object/event';
import LiveBlueprintContext from '../context';
import usePlumbContainer from 'react-plumb';

function Board() {
  const [ref, plumb] = usePlumbContainer();
  const { state, onDrop } = useContext(LiveBlueprintContext);
  console.log(state);
  useDrop({
    ref,
    onDrop: pkg => {
      onDrop({
        // NOTE: the ID MUST be a String to work with jsPlumb
        id: Math.floor(Math.random() * 10000000).toString(),
        x: pkg.x,
        y: pkg.y,
        data: pkg.data
      });
    },
    svg: true
  });
  return (
    <BoardView ref={ref}>
      {plumb(
        <>
          {Object.values(state.computeObjects).map(c => (
            <ComputeBlueprintObject key={c.id} id={c.id} object={c} />
          ))}
          {Object.values(state.storageObjects).map(s => (
            <StorageBlueprintObject key={s.id} id={s.id} object={s} />
          ))}
          {Object.values(state.eventObjects).map(e => (
            <EventBlueprintObject key={e.id} id={e.id} object={e} />
          ))}
        </>
      )}
    </BoardView>
  );
}

export default Board;
