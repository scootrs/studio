import useWorkspaceContext from '~components/workspace/context';
import { validateName } from '../validation';

export default function useInternalEventDetails() {
  const {
    selected: { config, monitor },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  const [error, caption] = validateName(config.id);

  return {
    type: 'event-internal',
    title: {
      value: config.id,
      placeholder: 'UnnamedInternalEvent',
      name: 'id',
      onChange,
      error,
      caption
    },
    tabs: [
      {
        title: 'Configuration',
        sections: []
      },
      {
        title: 'Monitor',
        sections: []
      }
    ]
  };
}
