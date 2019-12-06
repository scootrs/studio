import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import ComputeObjectSvg from '../../../../assets/vectors/object-compute.svg';

function ComputeObject(props = {}) {
  const ref = useRef();
  useDrag({
    ref,
    data: 'compute',
    svg: true
  });
  return <ComputeObjectSvg ref={ref} {...props} />;
}

export default ComputeObject;
