import React from 'react';
import styled from 'styled-components';
import Spinner from '~styles/spinner';

const ViewRoot = styled.footer`
  display: flex;
  font-size: 0.8em;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.static.dark.backgrounds.dark};
  flex-shrink: 1;
  color: ${({ theme }) => theme.colors.static.dark.fonts.main};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-left: auto;
`;

function FooterView({ showSpinner, statusMessage }) {
  return (
    <ViewRoot>
      <StatusContainer>
        {showSpinner ? <Spinner /> : ''}
        {statusMessage}
      </StatusContainer>
      <InfoContainer>Scootr Studio version 0.1.0</InfoContainer>
    </ViewRoot>
  );
}

export default FooterView;
