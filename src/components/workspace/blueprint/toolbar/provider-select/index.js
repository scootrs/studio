import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { ValidatedSelectInput } from '~styles/input/select-validated';

export default function ProviderSelect() {
  const {
    state: { provider },
    actions: { setProvider }
  } = useApplicationContext();

  const onChange = ev => {
    const val = ev.target.value;
    let error = '';
    if (val === '') {
      error = 'Provider is required';
    }
    setProvider(val, error);
  };

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

  return (
    <ValidatedSelectInput
      value={provider.value}
      onChange={onChange}
      options={options}
      isValid={provider.error === ''}
      caption={provider.error}
    />
  );
}
