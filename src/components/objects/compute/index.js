import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import ComputeObjectSvg from './object-compute.svg';

export default function ComputeObject({ ...rest }) {
  return <ComputeObjectSvg {...rest} />;
}

export function DraggableComputeObject({ ...rest }) {
  const ref = useRef();
  useDrag({
    ref,
    data: {
      type: 'compute'
    },
    svg: true
  });
  return <ComputeObjectSvg ref={ref} {...rest} />;
}
