import React from 'react';
import { TextInput } from '~styles/input';

export default function ApplicationNameView({ value, onChange }) {
  return <TextInput name="applicationName" value={value} onChange={onChange} />;
}
