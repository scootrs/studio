import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) =>
    theme.mode === 'light' ? theme.colors.backgrounds.light : theme.colors.backgrounds.medium};
  color: ${({ theme }) => theme.colors.fonts.light};
  min-width: 60px;
  flex-shrink: 0;
`;

function UtilityBarView({ children }) {
  return <Bar>{children ? children : ''}</Bar>;
}

export default UtilityBarView;
