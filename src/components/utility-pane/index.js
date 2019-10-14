import React from 'react';
import View from './view';
import ServiceProviderList from './service-provider-list';
import StorageProviderList from './storage-provider-list';

function UtilityPane() {
  return (
    <View>
      <ServiceProviderList />
      <StorageProviderList />
    </View>
  );
}

export default UtilityPane;
