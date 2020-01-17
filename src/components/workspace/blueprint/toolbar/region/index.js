import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { SelectInput } from '~styles/input/select';

export default function ProviderSelect() {
  const {
    state: { region },
    actions: { setRegion }
  } = useApplicationContext();

  const onChange = ev => setRegion(ev.target.value);

  const options = [
    {
      name: 'Select a region',
      value: ''
    },
    {
      name: 'US West 2',
      value: 'us-west-2'
    }
  ];

  return <SelectInput value={region.value} onChange={onChange} options={options} />;
}
