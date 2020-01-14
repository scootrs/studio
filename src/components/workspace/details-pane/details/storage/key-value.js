export function useKeyValueDetailTabs({ config }, onChange) {
  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'text',
              label: 'Collection Name',
              name: 'collection',
              value: config.collection,
              onChange
            },
            {
              type: 'text',
              label: 'Primary Key Name',
              name: 'keyName',
              value: config.keyName,
              onChange
            },
            {
              type: 'select',
              label: 'Primary Key Type',
              name: 'keyType',
              value: config.keyType,
              onChange,
              options: [
                {
                  name: 'Please select a type',
                  value: ''
                },
                {
                  name: 'String',
                  value: 'S'
                },
                {
                  name: 'Number',
                  value: 'N'
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
