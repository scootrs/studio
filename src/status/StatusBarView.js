import React from 'react';
import styled from 'styled-components';
import Spinner from 'shared/styles/spinner';

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled.div`
  margin-left: auto;
`;

function StatusBarView({ showSpinner, statusMessage }) {
  return (
    <>
      <StatusContainer>
        {showSpinner ? <Spinner /> : ''}
        {statusMessage}
      </StatusContainer>
      <InfoContainer>Scootr Studio version 0.1.0</InfoContainer>
    </>
  );
}

export default StatusBarView;
