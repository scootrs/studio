import React from 'react';

import { ValidatedSelectInput } from 'shared/styles/input/select-validated';

function ApplicationProviderView({value, options, caption, isValid, onChange}) {
  return (
    <ValidatedSelectInput
      value={value}
      onChange={onChange}
      options={options}
      isValid={isValid}
      caption={caption}
    />
  );
}

export default ApplicationProviderView;
