const validateEntries = require("../utils/validator");
const buildGraph = require("../utils/graphBuilder");
const detectCycle = require("../utils/cycleDetector");
const buildTree = require("../utils/treeBuilder");
const calculateDepth = require("../utils/depthCalculator");

const USER_ID = "rishitiwari_24072005";
const EMAIL_ID = "rishi1426.be23@chitkarauniversity.edu.in";
const COLLEGE_ROLL_NUMBER = "2311981426";

function getConnectedComponents(nodes, graph) {
  const visited = new Set();
  const components = [];

  const undirectedGraph = {};

  for (const node of nodes) {
    undirectedGraph[node] = [];
  }

  for (const parent in graph) {
    for (const child of graph[parent]) {
      undirectedGraph[parent].push(child);
      undirectedGraph[child].push(parent);
    }
  }

  for (const node of nodes) {
    if (visited.has(node)) continue;

    const queue = [node];
    const component = [];

    visited.add(node);

    while (queue.length) {
      const current = queue.shift();

      component.push(current);

      for (const neighbor of undirectedGraph[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    components.push(component);
  }

  return components;
}

const processHierarchy = (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "data must be an array",
      });
    }

    // Step 1: Validation
    const { validEdges, invalidEntries } = validateEntries(data);

    // Step 2: Graph Building + Duplicates + Multi-parent handling
    const {
      graph,
      childParent,
      nodes,
      duplicateEdges,
    } = buildGraph(validEdges);

    // Step 3: Connected Components
    const components = getConnectedComponents(nodes, graph);

    const hierarchies = [];

    let totalTrees = 0;
    let totalCycles = 0;

    let largestTreeRoot = "";
    let maxDepth = -1;

    for (const component of components) {
      const componentSet = new Set(component);

      // Find roots
      const roots = component.filter(
        (node) =>
          !childParent[node] ||
          !componentSet.has(childParent[node])
      );

      let root;

      if (roots.length > 0) {
        roots.sort();
        root = roots[0];
      } else {
        // Pure cycle
        root = [...component].sort()[0];
      }

      const cycleExists = detectCycle(
        root,
        graph,
        componentSet
      );

      if (cycleExists) {
        totalCycles++;

        hierarchies.push({
          root,
          tree: {},
          has_cycle: true,
        });

        continue;
      }

      const treeObject = {};
      treeObject[root] = buildTree(root, graph);

      const depth = calculateDepth(root, graph);

      totalTrees++;

      if (
        depth > maxDepth ||
        (depth === maxDepth &&
          root < largestTreeRoot)
      ) {
        maxDepth = depth;
        largestTreeRoot = root;
      }

      hierarchies.push({
        root,
        tree: treeObject,
        depth,
      });
    }

    return res.status(200).json({
      user_id: USER_ID,
      email_id: EMAIL_ID,
      college_roll_number: COLLEGE_ROLL_NUMBER,

      hierarchies,

      invalid_entries: invalidEntries,

      duplicate_edges: duplicateEdges,

      summary: {
        total_trees: totalTrees,
        total_cycles: totalCycles,
        largest_tree_root: largestTreeRoot,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  processHierarchy,
};