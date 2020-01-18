import React from 'react';
import { useApplicationContext } from '~contexts/application';
import { ValidatedSelectInput } from '~styles/input/select-validated';

export default function ProviderSelect() {
  const {
    state: { region },
    actions: { setRegion }
  } = useApplicationContext();

  const onChange = ev => {
    const val = ev.target.value;
    let error = '';
    if (val === '') {
      error = 'Provider is required';
    }
    setRegion(val, error);
  };

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

  return (
    <ValidatedSelectInput
      value={region.value}
      onChange={onChange}
      options={options}
      isValid={region.error === ''}
      caption={region.error}
    />
  );
}
