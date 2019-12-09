import React from 'react';
import { Button } from '~styles/input';

export default function DeployButtonView({ onDeploy }) {
  return <Button onClick={onDeploy}>Deploy</Button>;
}
