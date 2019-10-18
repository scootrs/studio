import React, { useRef } from 'react';
import useDrop from '../../../hooks/useDrop';
import BlueprintView from './view';

function Blueprint() {
  const dropRef = useRef();
  useDrop({
    ref: dropRef,
    onDrop: data => console.log(`Caught ${data}`)
  });
  return <BlueprintView ref={dropRef} />;
}

export default Blueprint;
