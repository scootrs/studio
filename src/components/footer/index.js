import React from 'react';
import View from './view';
import { useStatusContext } from '~contexts/status';

function Footer() {
  const context = useStatusContext();
  return <View showSpinner={context.state.isWaiting} statusMessage={context.state.statusMessage} />;
}

export default Footer;
