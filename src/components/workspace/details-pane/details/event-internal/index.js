import useWorkspaceContext from '~components/workspace/context';

export default function useInternalEventDetails() {
  const {
    selected: { config, monitor },
    actions: { setSelectedObjectConfig }
  } = useWorkspaceContext();

  const onChange = ev => setSelectedObjectConfig({ [ev.target.name]: ev.target.value });

  return {
    type: 'event-internal',
    title: {
      value: config.id,
      name: 'id',
      onChange
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
