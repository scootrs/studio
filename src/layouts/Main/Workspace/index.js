import React from 'react';
import View from './view';
import Editor from './Editor';
import DetailsPane from './DetailsPane';

export default function Workspace() {
  const onDrag = () => {
    document.dispatchEvent(new Event('monaco:resize'));
  };

  // TODO: implement load

  return (
    <View onDrag={onDrag}>
      <Editor />
      <DetailsPane />
    </View>
  );
}
