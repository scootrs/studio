import React from 'react';
import styled from 'styled-components';

const MenuRoot = styled.div`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.static.dark.fonts.main};
  background-color: ${({ theme }) => theme.colors.static.dark.backgrounds.dark};
  min-width: 200px;
  z-index: 999;
  box-shadow: 1px 1px 2px ${({ theme }) => theme.colors.static.dark.backgrounds.medium};
  font-weight: normal;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.static.dark.backgrounds.medium};
  }
`;

function ResourceContextMenu({ x, y, isShowing, actions }) {
  if (isShowing) {
    return (
      <MenuRoot x={x} y={y}>
        {actions.map(function(action) {
          const onClick = function() {
            action.action();
          };
          return (
            <MenuItem key={action.name} onClick={onClick}>
              {action.name}
            </MenuItem>
          );
        })}
      </MenuRoot>
    );
  }

  // Don't waste compute time
  return <></>;
}

export default ResourceContextMenu;
