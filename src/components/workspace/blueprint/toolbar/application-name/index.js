import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import ApplicationNameView from './view';

export default function ApplicationName() {
  const {
    application: { name },
    actions: { setApplicationConfig }
  } = useWorkspaceContext();

  const onChange = ev => setApplicationConfig({ name: ev.target.value });

  return <ApplicationNameView value={name} onChange={onChange} />;
}
