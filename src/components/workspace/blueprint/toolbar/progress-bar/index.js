import React from 'react';
import useWorkspaceContext from '~components/workspace/context';
import ProgressBarView from './view';

export default function ProgressBar() {
  const { pending } = useWorkspaceContext();

  return <ProgressBarView show={pending} />;
}
