
export function applyThemeToEndpoints(endpoints, theme) {
  const newEndpoints = [];
  for (let e of endpoints) {
    let ne = {
      ...e,
      connector: ['Flowchart', { cornerRadius: 5, stub: 10, alwaysRespectStubs: true }],
      maxConnections: -1,
      endpoint: ['Dot', { radius: 7 }]
    };

    if (e.isSource) {
      ne.anchor = [1, 0.5, 1, 0, 8, 0];
    } else if (e.isTarget) {
      ne.anchor = [0, 0.5, -1, 0, -8, 0];
    }

    ne.connectorStyle = {
      stroke: theme.colors.static.endpoints[theme.mode],
      strokeWidth: 5
    };

    if (e.dashed) {
      ne.connectorStyle.dashstyle = '2 2';
    }

    ne.paintStyle = {
      width: 5,
      height: 5,
      fill: theme.colors.static.endpoints[theme.mode]
    };

    newEndpoints.push(ne);
  }
  return newEndpoints;
}
