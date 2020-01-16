function useHttpEventDetailTabs({ config = {}, deployment = {} }, onChange) {
  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'text',
              label: 'URI Path',
              name: 'path',
              value: config.path,
              onChange
            },
            {
              type: 'select',
              label: 'Method',
              name: 'method',
              value: config.method,
              onChange,
              options: [
                {
                  name: 'Please select a method',
                  value: ''
                },
                {
                  name: 'GET',
                  value: 'get'
                },
                {
                  name: 'POST',
                  value: 'post'
                },
                {
                  name: 'PUT',
                  value: 'put'
                },
                {
                  name: 'DELETE',
                  value: 'delete'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Deployment',
      sections: [
        {
          title: 'General Information',
          inputs: [
            {
              type: 'text',
              label: 'URL',
              name: 'url',
              value: deployment.url
            }
          ]
        }
      ]
    }
  ];
}

export default useHttpEventDetailTabs;
