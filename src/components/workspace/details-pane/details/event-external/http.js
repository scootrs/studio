export const defaults = {
  config: {
    path: '',
    method: ''
  },
  validation: {
    path: 'URL path is required',
    method: 'HTTP method is required'
  }
};

function validatePath(val) {
  if (val === '') return 'URL path is required';
  return '';
}

function validateMethod(val) {
  if (val === '') return 'HTTP method is required';
  return '';
}

export function useHttpEventDetailTabs(selected, updateSelectedConfiguration) {
  return [
    {
      title: 'Configuration',
      sections: [
        {
          title: 'General',
          inputs: [
            {
              type: 'validated-text',
              label: 'URI Path',
              name: 'path',
              value: selected.config.path,
              onChangeEnd: function(val, error) {
                updateSelectedConfiguration({ path: val }, { path: error });
              },
              onValidate: function(val) {
                return validatePath(val);
              },
              seedIsValid: selected.validation.fields.path === '',
              seedCaption: selected.validation.fields.path
            },
            {
              type: 'validated-select',
              label: 'Method',
              name: 'method',
              value: selected.config.method,
              onChange: function(ev) {
                const newValue = ev.target.value;
                updateSelectedConfiguration({ method: newValue }, { method: validateMethod(newValue) });
              },
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
              ],
              isValid: selected.validation.fields.method === '',
              caption: selected.validation.fields.method
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
              value: selected.deployment.url
            }
          ]
        }
      ]
    }
  ];
}
