import React, { useState } from 'react';
import StorageProviderListView from './view';

const initialState = [
  {
    id: 'storage-1',
    type: 'storage',
    name: 'Storage 1'
  },
  {
    id: 'storage-2',
    type: 'storage',
    name: 'Storage 2'
  },
  {
    id: 'storage-3',
    type: 'storage',
    name: 'Storage 3'
  }
];

function StorageProviderList() {
  const [providers, setProviders] = useState(initialState);

  return <StorageProviderListView providers={providers} />;
}

export default StorageProviderList;
