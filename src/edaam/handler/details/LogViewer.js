import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Spinner from 'shared/styles/spinner';

import actions from '../actions';
import selectors from '../selectors';

const ViewRoot = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StatusSpan = styled.span`
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

function LogViewer({ resourceId }) {
  const dispatch = useDispatch();

  // Fetch logs on mount
  useEffect(() => {
    dispatch(actions.fetchLogs(resourceId));
    return () => {
      dispatch(actions.cancelFetchLogs(resourceId));
    };
  }, [dispatch, resourceId]);

  const logs = useSelector(selectors.getLogs(resourceId));

  if (!logs) {
    return (
      <ViewRoot>
        <p>You must successfully deploy your application before you can see logs</p>
      </ViewRoot>
    );
  }

  return (
    <ViewRoot>
      <StatusSpan>
        {logs.isFetching ? <LoadingLogsSpinner /> : ''} {logs.message}
      </StatusSpan>

      <LogContainer>
        <LogOutputPre>{logs.value}</LogOutputPre>
      </LogContainer>
    </ViewRoot>
  );
}

export default LogViewer;
