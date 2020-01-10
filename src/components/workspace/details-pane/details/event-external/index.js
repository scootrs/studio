import { useWorkspaceContext } from '~contexts/workspace';
import { validateName } from '../validation';
import useHttpEventDetailTabs from './http';

export default function useEventDetails() {
  const {
    state: { selected },
    actions: { updateSelectedConfiguration }
  } = useWorkspaceContext();

  const onChange = ev => updateSelectedConfiguration({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(selected.config.id);

  return {
    type: selected.meta.type,
    header: {
      icon: selected.meta.type,
      title: {
        value: selected.config.id,
        placeholder: 'UnnamedExternalEvent',
        name: 'id',
        onChange,
        error,
        caption
      },
      inputs: [
        {
          type: 'select',
          name: 'type',
          value: selected.config.type,
          onChange,
          options: [
            {
              name: 'Please select an event type',
              value: ''
            },
            {
              name: 'HTTP',
              value: 'http'
            }
          ]
        }
      ]
    },
    tabs: getTabsForType(selected, onChange)
  };
}

function getTabsForType(selected, onChange) {
  switch (selected.config.type) {
    case 'http':
      return useHttpEventDetailTabs(selected, onChange);

    default:
      return [];
  }
}
