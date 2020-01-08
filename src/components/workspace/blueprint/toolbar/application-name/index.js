import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import ApplicationNameView from './view';

export default function ApplicationName() {
  const {
    application: { name },
    actions: { setApplicationConfig }
  } = useWorkspaceContext();

  const onChange = ev => setApplicationConfig({ name: ev.target.value });

  let error = false;
  let caption = '';
  if (name !== '' && !/(^[a-z0-9]+$)/gim.test(name)) {
    error = true;
    caption = 'Name must only contain alphanumeric characters';
  }

  return <ApplicationNameView value={name} onChange={onChange} error={error} caption={caption} />;
}
