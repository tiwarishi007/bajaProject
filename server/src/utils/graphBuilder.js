function buildGraph(validEdges) {
  const graph = {};
  const childParent = {};
  const nodes = new Set();

  const duplicateEdges = [];
  const edgeSet = new Set();

  for (const edge of validEdges) {
    if (edgeSet.has(edge)) {
      if (!duplicateEdges.includes(edge)) {
        duplicateEdges.push(edge);
      }
      continue;
    }

    edgeSet.add(edge);

    const [parent, child] = edge.split("->");

    // multi-parent rule
    if (childParent[child]) {
      continue;
    }

    childParent[child] = parent;

    if (!graph[parent]) graph[parent] = [];
    if (!graph[child]) graph[child] = [];

    graph[parent].push(child);

    nodes.add(parent);
    nodes.add(child);
  }

  return {
    graph,
    childParent,
    nodes: [...nodes],
    duplicateEdges,
  };
}

module.exports = buildGraph;