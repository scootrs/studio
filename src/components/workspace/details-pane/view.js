import React from 'react';
import styled from 'styled-components';

const DetailsPaneRoot = styled.div`
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

const DetailsContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  min-height: min-content;
`;

function DetailsPaneView({ children, onClick, onKeyDown }) {
  return (
    <DetailsContainer>
      <DetailsPaneRoot tabIndex={-1} onClick={onClick} onKeyDown={onKeyDown}>
        {children}
      </DetailsPaneRoot>
    </DetailsContainer>
  );
}

export default DetailsPaneView;
