import React from 'react';
import styled from 'styled-components';

const TooltipText = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  ${({ tooltip }) => _textPosition(tooltip)}
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    border-width: 5px;
    border-style: solid;
    boder-color: black transparent transparent transparent;
    ${({ tooltip }) => _arrowPosition(tooltip)}
  }
`;

function _textPosition(tooltip) {
  let tooltipTextPosition = null;
  switch (tooltip) {
    case 'top':
      tooltipTextPosition = `
        bottom: 100%;
        left: 50%;
        margin-left: calc(-50%);
      `;
      break;

    case 'right':
      tooltipTextPosition = `
        width: 120px;
        top: -5px;
        left: 105%;
      `;
      break;

    case 'bottom':
      tooltipTextPosition = `
        top: 100%;
        left: 50%;
        margin-left: calc(-50%);
      `;
      break;

    case 'left':
      tooltipTextPosition = `
        top: -5px;
        right: 105%;
      `;
      break;

    default:
      throw new Error(
        'Invalid position for tooltip: ' + position + '. Should be one of "left", "right", "top", or "bottom".'
      );
  }
  return tooltipTextPosition;
}

function _arrowPosition(tooltip) {
  let tooltipArrowPosition = null;
  switch (tooltip) {
    case 'top':
      tooltipArrowPosition = `
        top: 100%;
        left: 50%;
        margin-left: -5px;
      `;
      break;

    case 'right':
      tooltipArrowPosition = `
        top: 50%;
        right: 100%;
        margin-top: -5px;
      `;
      break;

    case 'bottom':
      tooltipArrowPosition = `
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
      `;
      break;

    case 'left':
      tooltipArrowPosition = `
        top: 50%;
        left: 100%;
        margin-top: -5px;
      `;
      break;

    default:
      throw new Error(
        'Invalid position for tooltip: ' + position + '. Should be one of "left", "right", "top", or "bottom".'
      );
  }
  return tooltipArrowPosition;
}

function withTooltip(Component) {
  const TooltipContainer = styled(Component)`
    position: relative;

    &:hover ${TooltipText} {
      visibility: show;
    }
  `;

  function TooltipComponent({ children, title, ...props }) {
    return (
      <TooltipContainer {...props}>
        {children}
        <TooltipText>{title}</TooltipText>
      </TooltipContainer>
    );
  }

  return TooltipComponent;
}

export default withTooltip;
