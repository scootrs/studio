import { useWorkspaceContext } from '~contexts/workspace';
import { validateName } from '../validation';

export default function useInternalEventDetails() {
  const {
    state: {
      selected: { meta, config, monitor }
    },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: meta.type,
    header: {
      icon: meta.type,
      title: {
        value: config.id,
        placeholder: 'UnnamedInternalEvent',
        name: 'id',
        onChange,
        error,
        caption
      },
      inputs: []
    },
    tabs: [
      {
        title: 'Configuration',
        sections: [
          {
            title: 'General',
            inputs:[
              {
                type: 'text',
                label: 'Topic Name',
                name: 'name',
                value: config.name,
                onChange
              }
            ]
          }
        ]
      }
    ]
  };
}
