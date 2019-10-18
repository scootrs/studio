import React, { forwardRef } from 'react';
import styled from 'styled-components';

const Viewport = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;

function BlueprintView({}, ref) {
  return <Viewport ref={ref}>Hello, world!</Viewport>;
}

export default forwardRef(BlueprintView);
