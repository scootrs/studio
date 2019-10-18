import React from 'react';
import View from './view';
import ComputeProviderList from './compute-provider-list';
import StorageProviderList from './storage-provider-list';

function UtilityPane() {
  return (
    <View>
      <ComputeProviderList />
      <StorageProviderList />
    </View>
  );
}

export default UtilityPane;
