import React from 'react';

import { ValidatedSelectInput } from 'styles/input/select-validated';

function ApplicationRegionView({ value, options, caption, isValid, onChange }) {
  return (
    <ValidatedSelectInput value={value} onChange={onChange} options={options} isValid={isValid} caption={caption} />
  );
}

export default ApplicationRegionView;
