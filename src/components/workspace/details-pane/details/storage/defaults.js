const documentDefaults = {
  table: '',
  primaryName: '',
  primaryType: ''
};

export function getDefaultsForType(type) {
  switch (type) {
    case 'document':
      return documentDefaults;

    case '':
      return {};

    default:
      throw new Error('Failed to get default storage configuration: The type ' + type + ' is invalid');
  }
}
