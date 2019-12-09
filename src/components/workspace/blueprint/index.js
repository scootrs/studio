import React from 'react';
import BlueprintCanvas from './canvas';
import BlueprintView from './view';
import Toolbar from './toolbar';

export default function Blueprint() {
  return (
    <BlueprintView>
      <Toolbar />
      <BlueprintCanvas />
    </BlueprintView>
  );
}
