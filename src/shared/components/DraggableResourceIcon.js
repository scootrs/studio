import React, { useRef } from 'react';

import useDrag from 'shared/hooks/useDrag';

function DraggableResourceIcon({ type, Svg }) {
  const ref = useRef();
  useDrag({
    ref,
    svg: true,
    data: {
      type,
    },
  });
  return <Svg className={''} width={20} height={20} ref={ref} />;
}

export default DraggableResourceIcon;
