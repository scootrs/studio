import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import StorageObjectSvg from './object-storage.svg';

export default function StorageObject({ width = 40, height = 40, ...rest }) {
  return <StorageObjectSvg width={width} height={height} {...rest} />;
}

export function DraggableStorageObject({ width = 40, height = 40, ...rest }) {
  const ref = useRef();
  const type = 'storage';
  useDrag({
    ref,
    data: {
      info: {
        type
      },
      config: {
        type
      }
    },
    svg: true
  });
  return <StorageObjectSvg ref={ref} width={width} height={height} {...rest} />;
}
