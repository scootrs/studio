import React from 'react';
import usePlumbContainer from 'react-plumb';
import uuid from 'uuid/v4';
import useDrop from '~hooks/useDrop';
import useBlueprintContext from '~components/live-blueprint/context';
import BoardView from './view';
import ComputeBlueprintObject from './blueprint-object/compute';
import StorageBlueprintObject from './blueprint-object/storage';
import EventBlueprintObject from './blueprint-object/event';

function Blueprint() {
  const {
    objects,
    connections,
    actions: { setObject, setSelected, setConnection }
  } = useBlueprintContext();

  const [ref, plumb] = usePlumbContainer({
    onConnect: conn => setConnection(conn),
    connections: Object.values(connections)
  });

  useDrop({
    ref,
    onDrop: pkg => {
      setObject({
        id: uuid(),
        x: pkg.x,
        y: pkg.y,
        ...pkg.data
      });
    },
    svg: true
  });

  const onBlueprintClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setSelected(null);
  };

  return (
    <BoardView ref={ref} onClick={onBlueprintClick}>
      {plumb(
        Object.values(objects).map(o => {
          switch (o.type) {
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
