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
      type: 'compute',
      config: {
        id: '',
        language: 'javascript',
        runtime: '',
        vcs: '',
        code: '',
        env: [],
        tags: []
      }
    },
    svg: true
  });
  return <ComputeObjectSvg ref={ref} width={width} height={height} {...rest} />;
}
