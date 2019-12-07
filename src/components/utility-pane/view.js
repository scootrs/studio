import React from 'react';
import styled from 'styled-components';

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.backgrounds.medium};
  color: ${({ theme }) => theme.colors.fonts.light};
  min-width: 60px;
  flex-shrink: 0;
`;

function UtilityPaneView({ children }) {
  return <Pane>{children ? children : ''}</Pane>;
}

export default UtilityPaneView;
