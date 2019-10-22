import React from 'react';
import styled from 'styled-components';

const Pane = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.backgrounds.medium};
  color: ${({ theme }) => theme.colors.fonts.light};
`;

function UtilityPaneView({ children }) {
  return <Pane>{children ? children : ''}</Pane>;
}

export default UtilityPaneView;
