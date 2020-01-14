const keyValDefaults = {
  collection: '',
  keyName: '',
  keyType: ''
};

export function getDefaultsForType(type) {
  switch (type) {
    case 'keyval':
      return keyValDefaults;

    case '':
      return {};

    default:
      throw new Error('Failed to get default storage configuration: The type ' + type + ' is invalid');
  }
}
