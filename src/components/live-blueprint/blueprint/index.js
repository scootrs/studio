import React, { useContext } from 'react';
import useDrop from '../../../hooks/useDrop';
import BoardView from './view';
import ComputeBlueprintObject from './blueprint-object/compute';
import StorageBlueprintObject from './blueprint-object/storage';
import EventBlueprintObject from './blueprint-object/event';
import LiveBlueprintContext from '../context';
import usePlumbContainer from 'react-plumb';
import uuid from 'uuid/v4';

function Blueprint() {
  const [ref, plumb] = usePlumbContainer();
  const { state, onDrop, clearCurrent } = useContext(LiveBlueprintContext);

  useDrop({
    ref,
    onDrop: pkg => {
      onDrop({
        id: uuid(),
        x: pkg.x,
        y: pkg.y,
        data: pkg.data
      });
    },
    svg: true
  });

  const onBlueprintClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    if (state.current.id) {
      clearCurrent();
    }
  };

  return (
    <BoardView ref={ref} onClick={onBlueprintClick}>
      {plumb(
        Object.values(state.objects).map(o => {
          switch (o.data.type) {
            case 'compute':
              return <ComputeBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'storage':
              return <StorageBlueprintObject key={o.id} id={o.id} object={o} />;

            case 'event':
              return <EventBlueprintObject key={o.id} id={o.id} object={o} />;
          }
        })
      )}
    </BoardView>
  );
}

export default Blueprint;
