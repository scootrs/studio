import React from 'react';
import View from './view';
import ComputeConfigDetailsPanel from './config';
import CodeComputeDetailsPanel from './code';

export default function ComputeDetails() {
  return (
    <View>
      <ComputeConfigDetailsPanel name={'Config'} />
      <CodeComputeDetailsPanel name={'Code'} />
    </View>
  );
}
