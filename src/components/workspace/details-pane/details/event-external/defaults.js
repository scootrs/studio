const http = {
  path: '',
  method: ''
};

export function getDefaultsForType(type) {
  switch (type) {
    case 'http':
      return http;

    case '':
      return {};

    default:
      throw new Error('Failed to get defaults for the external event: The type ' + type + ' is invalid');
  }
}
