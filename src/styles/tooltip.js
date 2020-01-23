import React, { useState } from 'react';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
`;

const TooltipText = styled.div`
  position: absolute;
  visibility: ${({ showing }) => (showing ? 'visible' : 'hidden')};
  background-color: ${({ theme }) => theme.colors.static.dark.backgrounds.dark};
  color: ${({ theme }) => theme.colors.static.dark.fonts.main};
  text-align: center;
  padding: 5px;
  border-radius: 3px;
  ${({ position }) => _textPosition(position)}
  z-index: 1;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
`;

function _textPosition(position) {
  let tooltipTextPosition = null;
  switch (position) {
    case 'top':
      tooltipTextPosition = `
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
      `;
      break;

    case 'right':
      tooltipTextPosition = `
        top: 50%;
        transform: translateY(-50%);
        left: 120%;
      `;
      break;

    case 'bottom':
      tooltipTextPosition = `
        top: 120%;
        left: 50%;
        transform: translateX(-50%);
      `;
      break;

    case 'left':
      tooltipTextPosition = `
        top: 50%;
        transform: translateY(-50%);
        right: 120%;
      `;
      break;

    default:
      throw new Error(
        'Invalid position for tooltip: ' + position + '. Should be one of "left", "right", "top", or "bottom".'
      );
  }
  return tooltipTextPosition;
}

function Tooltip({ children, title, position }) {
  const [isShowing, setShowing] = useState(false);

  const onMouseEnter = () => {
    setShowing(true);
  };
  const onMouseLeave = () => {
    setShowing(false);
  };

  return (
    <TooltipContainer onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      <TooltipText position={position} showing={isShowing}>
        {title}
      </TooltipText>
    </TooltipContainer>
  );
}

export default Tooltip;
