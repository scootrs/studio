import React from 'react';
import { Select, Option } from '~styles/input';

export default function RegionSelectView({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <Option value="">Select a region</Option>
      <Option value="us-west-2">US West 2</Option>
    </Select>
  );
}
