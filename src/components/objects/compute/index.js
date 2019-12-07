import React, { useRef } from 'react';
import useDrag from '../../../hooks/useDrag';
import ComputeObjectSvg from './object-compute.svg';

export default function ComputeObject({ width = 40, height = 40, ...rest }) {
  return <ComputeObjectSvg width={width} height={height} {...rest} />;
}

export function DraggableComputeObject({ width = 40, height = 40, ...rest }) {
  const ref = useRef();
  useDrag({
    ref,
    data: {
      type: 'compute'
    },
    svg: true
  });
  return <ComputeObjectSvg ref={ref} width={width} height={height} {...rest} />;
}
