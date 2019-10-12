import React from 'react';
import styled from 'styled-components';

const Pane = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-align: column;
  align-items: stretch;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.backgrounds.medium};
  color: ${({ theme }) => theme.colors.fonts.light};
`;

function UtilityPaneView() {
  return (
    <Pane>
      <p>Hello, world!</p>
    </Pane>
  );
}

export default UtilityPaneView;
