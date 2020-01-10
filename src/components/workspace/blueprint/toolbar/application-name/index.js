import React from 'react';
import { useApplicationContext } from '~contexts/application';
import ApplicationNameView from './view';

export default function ApplicationName() {
  const {
    state: { name },
    actions: { setName }
  } = useApplicationContext();

  const onChange = ev => setName(ev.target.value);

  let error = false;
  let caption = '';
  if (name !== '' && !/(^[a-z0-9]+$)/gim.test(name)) {
    error = true;
    caption = 'Name must only contain alphanumeric characters';
  }

  return <ApplicationNameView value={name} onChange={onChange} error={error} caption={caption} />;
}
