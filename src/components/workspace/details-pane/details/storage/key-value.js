export function useKeyValueDetailTabs(selected, updateSelectedConfiguration) {
  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

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
              value: selected.config.collection,
              onChange
            },
            {
              type: 'text',
              label: 'Primary Key Name',
              name: 'keyName',
              value: selected.config.keyName,
              onChange
            },
            {
              type: 'select',
              label: 'Primary Key Type',
              name: 'keyType',
              value: selected.config.keyType,
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
