import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import StorageObjectSvg from './object-storage.svg';

export default function StorageObject(props = {}) {
  return <StorageObjectSvg {...props} />;
}

export function DraggableStorageObject(props = {}) {
  const ref = useRef();
  useDrag({
    ref,
    data: {
      type: 'storage'
    },
    svg: true
  });
  return <StorageObjectSvg ref={ref} {...props} />;
}
