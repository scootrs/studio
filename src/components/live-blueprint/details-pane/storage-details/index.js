import React from 'react';
import View from './view';
import StorageConfigDetailsPane from './config';

export default function StorageDetails() {
  return (
    <View>
      <StorageConfigDetailsPane name="Config" />
    </View>
  );
}
