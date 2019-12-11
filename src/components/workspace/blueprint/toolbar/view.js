import React from 'react';
import styled from 'styled-components';

const ToolbarViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-shrink: 0;

  background-color: ${({ theme }) => theme.colors.backgrounds.light};
  box-shadow: -1px 1px 2px ${({ theme }) => theme.colors.backgrounds.medium}
  z-index: 2;
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

export default function ToolbarView({ children, Loader }) {
  return (
    <ToolbarViewRoot>
      <ToolbarViewMain>{children}</ToolbarViewMain>
      <Loader />
    </ToolbarViewRoot>
  );
}
