import React from 'react';
import View from './view';
import ConnectionConfigDetailsPane from './config';

export default function ConnectionDetails() {
  return (
    <View>
      <ConnectionConfigDetailsPane name="Config" />
    </View>
  );
}
