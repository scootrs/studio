import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { SelectInput } from '~styles/input/select';

export default function ProviderSelect() {
  const {
    state: { provider },
    actions: { setProvider }
  } = useApplicationContext();

  const onChange = ev => setProvider(ev.target.value);

  const options = [
    {
      name: 'Select a provider',
      value: ''
    },
    {
      name: 'AWS',
      value: 'aws'
    }
  ];

  return <SelectInput value={provider.value} onChange={onChange} options={options} />;
}
