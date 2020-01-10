import React from 'react';
import { useApplicationContext } from '~contexts/application';
import ProviderSelectView from './view';

export default function ProviderSelect() {
  const {
    state: { provider },
    actions: { setProvider }
  } = useApplicationContext();

  const onChange = ev => setProvider(ev.target.value);

  return <ProviderSelectView value={provider} onChange={onChange} />;
}
