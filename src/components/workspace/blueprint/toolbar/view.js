import React from 'react';
import styled from 'styled-components';
import { Select, Option, Button } from '~styles/input';

const ToolbarViewRoot = styled.div`
  display: flex;
  align-self: stretch;
  flex-shrink: 0;

  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  padding: 10px;
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
      <ToolbarViewActions>
        {actions}
      </ToolbarViewActions>
    </ToolbarViewRoot>
  );
}
