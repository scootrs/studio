import React from 'react';
import { Button } from '~styles/input';

export default function SaveButtonView({ onSave }) {
  return <Button onClick={onSave}>Save</Button>;
}
