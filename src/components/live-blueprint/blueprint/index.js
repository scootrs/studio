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
  const [ref, plumb] = usePlumbContainer();
  const {
    objects,
    actions: { onObjectDrop, onSelectObject }
  } = useBlueprintContext();

  useDrop({
    ref,
    onDrop: pkg => {
      onObjectDrop({
        info: {
          id: uuid(),
          x: pkg.x,
          y: pkg.y,
          ...pkg.data.info
        },
        config: {
          ...pkg.data.config
        }
      });
    },
    svg: true
  });

  const onBlueprintClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    onSelectObject(null);
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
