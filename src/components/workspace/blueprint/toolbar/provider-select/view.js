import React from 'react';
import { Select, Option } from '~styles/input';

export default function ProviderSelectView({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <Option value="">Select a provider</Option>
      <Option value="aws">AWS</Option>
    </Select>
  );
}
