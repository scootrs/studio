import React from 'react';
import { useSelector } from 'react-redux';

import StatusBarView from './StatusBarView';
import selectors from './selectors';

function StatusBar() {
  const message = useSelector(selectors.getMessage);
  const isWaiting = useSelector(selectors.checkIsWaiting);

  return <StatusBarView showSpinner={isWaiting} statusMessage={message} />;
}

export default StatusBar;
