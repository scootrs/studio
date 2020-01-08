import theme from '~styles/theme';

const defaults = {
  connector: ['Flowchart', { cornerRadius: 5, stub: 10, alwaysRespectStubs: true }],
  connectorStyle: {
    stroke: theme.colors.backgrounds.medium,
    strokeWidth: 5
  },
  paintStyle: {
    width: 5,
    height: 5,
    fill: theme.colors.backgrounds.medium
  },
  maxConnections: -1,
  endpoint: ['Dot', { radius: 5 }]
};

export function merge(options) {
  if (options.isSource) options.anchor = [1, 0.5, 1, 0, 6, 0];
  else if (options.isTarget) options.anchor = [0, 0.5, -1, 0, -6, 0];
  if (options.dashed)
    options.connectorStyle = {
      ...defaults.connectorStyle,
      dashstyle: '2 2'
    };

  return {
    ...defaults,
    ...options
  };
}
