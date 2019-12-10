import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import ProviderSelectView from './view';

export default function ProviderSelect() {
  const {
    provider,
    actions: { setProvider }
  } = useWorkspaceContext();

  const onChange = ev => setProvider(ev.target.value);

  return <ProviderSelectView value={provider} onChange={onChange} />;
}
