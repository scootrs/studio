import React from 'react';
import styled from 'styled-components';

const DetailsPaneRoot = styled.div`
  box-shadow: 1px 1px 3px ${({ theme }) => theme.colors.backgrounds.medium};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px;
  flex-grow: 1;
`;

function DetailsPaneView({ children }) {
  return <DetailsPaneRoot>{children}</DetailsPaneRoot>;
}

export default DetailsPaneView;
