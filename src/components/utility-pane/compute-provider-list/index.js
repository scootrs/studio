import React, { useState } from 'react';
import ComputeProviderListView from './view';

const initialState = [
  {
    id: 'function-1',
    type: 'function',
    name: 'Function 1'
  },
  {
    id: 'function-2',
    type: 'function',
    name: 'Function 2'
  },
  {
    id: 'function-3',
    type: 'function',
    name: 'Function 3'
  }
];

function ComputeProviderList() {
  const [providers, setProviders] = useState(initialState);

  return <ComputeProviderListView providers={providers} />;
}

export default ComputeProviderList;
