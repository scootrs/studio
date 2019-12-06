import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import StorageObjectSvg from '../../../../assets/vectors/object-storage.svg';

function StorageObject(props = {}) {
  const ref = useRef();
  useDrag({
    ref,
    data: 'storage',
    svg: true
  });
  return <StorageObjectSvg ref={ref} {...props} />;
}

export default StorageObject;
