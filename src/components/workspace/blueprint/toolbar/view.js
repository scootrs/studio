import React from 'react';
import styled from 'styled-components';

const ToolbarViewRoot = styled.div`
  display: flex;
  align-self: stretch;
  flex-shrink: 0;

  background-color: ${({ theme }) => theme.colors.backgrounds.light};
  box-shadow: -1px 1px 2px ${({ theme }) => theme.colors.backgrounds.medium}
  padding: 10px;
  z-index: 2;
`;

const ToolbarViewActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export default function ToolbarView({ children, actions }) {
  return (
    <ToolbarViewRoot>
      {children}
      <ToolbarViewActions>{actions}</ToolbarViewActions>
    </ToolbarViewRoot>
  );
}
