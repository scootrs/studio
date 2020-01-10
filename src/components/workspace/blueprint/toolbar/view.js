import React from 'react';
import styled from 'styled-components';

const ToolbarViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-shrink: 0;

  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  border-bottom: 2px solid ${({ theme }) => theme.colors.backgrounds.light};
`;

const ToolbarViewMain = styled.div`
  display: flex;
  padding: 10px;
  align-self: stretch;
`;

export const ToolbarViewActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export default function ToolbarView({ children }) {
  return (
    <ToolbarViewRoot>
      <ToolbarViewMain>{children}</ToolbarViewMain>
    </ToolbarViewRoot>
  );
}
