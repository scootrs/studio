export function useDocumentStorageDetailTabs({ config }, onChange) {
  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'text',
              label: 'Table Name',
              name: 'table',
              value: config.table,
              onChange
            },
            {
              type: 'text',
              label: 'Primary Key Name',
              name: 'primaryName',
              value: config.primaryName,
              onChange
            },
            {
              type: 'select',
              label: 'Primary Key Type',
              name: 'primaryType',
              value: config.primaryType,
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
