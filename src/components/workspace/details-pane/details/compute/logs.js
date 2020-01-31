import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useLogEvents } from '~api/logs';
import Spinner from '~styles/spinner';

const ViewRoot = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const LoadingStatus = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sizes.small};
  margin-top: 5px;
  margin-left: 8px;
`;

const LoadingLogsSpinner = styled(Spinner)`
  margin-right: 10px;
`;

const LogContainer = styled.div`
  align-self: stretch;
  flex-grow: 1;
  margin: 5px;
  border: 1px solid ${({ theme }) => theme.colors.backgrounds.light};
`;

const LogOutputPre = styled.pre`
  background-color: ${({ theme }) => theme.colors.backgrounds.main};
  color: ${({ theme }) => theme.colors.fonts.main};
  border: none;
  white-space: pre-wrap;
  width: 100%:
  height: 100%;
  padding: 5px;
`;

const baseUrl = 'http://localhost:3030/api/v0';

function ComputeResourceLogsPane({ name }) {
  // Fetch logs on mount
  const [state, setState] = useState({
    logs: '',
    isFetchingLogs: true
  });

  const logEventSourceRef = useRef(null);

  useLogEvents(baseUrl, name, logEventSourceRef, setState);

  if (!name) {
    return (
      <ViewRoot>
        <p>You must successfully deploy your application before you can see logs</p>
      </ViewRoot>
    );
  }

  return (
    <ViewRoot>
      <LoadingStatus>
        {state.isFetchingLogs ? (
          <>
            <LoadingLogsSpinner /> Connecting to log stream
          </>
        ) : (
          <>
            Log stream connected. Polling every 1000ms.
          </>
        )}
      </LoadingStatus>

      <LogContainer>
        <LogOutputPre>{state.logs}</LogOutputPre>
      </LogContainer>
    </ViewRoot>
  );
}

export default ComputeResourceLogsPane;
