function buildTree(node, graph) {
  const children = graph[node] || [];

  const result = {};

  for (const child of children) {
    result[child] = buildTree(child, graph);
  }

  return result;
}

module.exports = buildTree;