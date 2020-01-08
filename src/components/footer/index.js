import React from 'react';
import View from './view';
import { useStatusContext } from '~contexts/status';

function Footer() {
  const context = useStatusContext();
  return <View showSpinner={context.isWaiting} statusMessage={context.statusMessage} />;
}

export default Footer;
