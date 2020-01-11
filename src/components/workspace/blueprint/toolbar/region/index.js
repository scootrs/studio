import React from 'react';
import { useApplicationContext } from '~contexts/application';
import RegionSelectView from './view';

export default function RegionSelect() {
  const {
    state: { region },
    actions: { setRegion }
  } = useApplicationContext();

  const onChange = ev => setRegion(ev.target.value);

  return <RegionSelectView value={region} onChange={onChange} />;
}
