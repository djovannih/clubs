import type { UpdateAttributeAction } from "./player";

export type GraphNode = {
  id: string;
  activationCost: number;
  isActive: boolean;
  parents: GraphNode[];
  children: GraphNode[];
  row: number;
  column: number;
  actions: UpdateAttributeAction[];
};

export type Graph = Map<string, GraphNode>;

export type Forest = Graph[];

export type ToggleNodeResult = {
  updatedTree: Graph;
  cost: number;
};

type NodeInfo = Omit<GraphNode, "id" | "isActive" | "parents" | "children"> & {
  parentIds: string[];
};

const addNode = (tree: Graph, nodeInfo: NodeInfo) => {
  const node: GraphNode = {
    id: `${String.fromCharCode(65 + nodeInfo.column)}${nodeInfo.row + 1}`,
    row: nodeInfo.row,
    column: nodeInfo.column,
    activationCost: nodeInfo.activationCost,
    isActive: false,
    actions: nodeInfo.actions,
    parents: nodeInfo.parentIds.map((parentId) => tree.get(parentId)!),
    children: [],
  };

  return new Map(
    nodeInfo.parentIds.reduce(
      (treeAcc, parentId) => {
        const parentNode = treeAcc.get(parentId)!;
        return treeAcc.set(parentId, {
          ...parentNode,
          children: [...parentNode.children, node],
        });
      },
      tree.set(node.id, node),
    ),
  );
};

export const createTree = (nodes: NodeInfo[]) =>
  new Map(nodes.reduce((tree, node) => addNode(tree, node), new Map()));

export const getCheapestBranch = (startNode: GraphNode): GraphNode[] => {
  function findBranchToRoot(
    node: GraphNode,
    currentBranch: GraphNode[] = [],
  ): GraphNode[] {
    // Add current node to the branch
    const branch = [node, ...currentBranch];

    // If the node is a root or an active parent, return the branch
    if (node.isActive || node.parents.length === 0) {
      return branch;
    }

    // Recursively find the cheapest branch from the parents
    let cheapestBranch: GraphNode[] = [];
    let minCost = Infinity;

    for (const parent of node.parents) {
      const parentBranch = findBranchToRoot(parent, branch);
      const branchCost = parentBranch.reduce(
        (acc, n) => acc + n.activationCost,
        0,
      );

      if (branchCost < minCost) {
        minCost = branchCost;
        cheapestBranch = parentBranch;
      }
    }

    return cheapestBranch;
  }

  return findBranchToRoot(startNode);
};

export const toggleNode = (graph: Graph, node: GraphNode) => {
  if (node.isActive) {
    const getToggledNodes = (node: GraphNode): GraphNode[] => [
      node,
      ...node.children
        .filter((child) =>
          child.parents.some(
            (parent) => parent.id !== node.id && !parent.isActive,
          ),
        )
        .flatMap((node) => getToggledNodes(node)),
    ];
    const nodesToDeactivate = getToggledNodes(node);
    const updatedTree = new Map(
      nodesToDeactivate.reduce(
        (updatedTree, node) =>
          updatedTree.set(node.id, { ...graph.get(node.id)!, isActive: false }),
        graph,
      ),
    );
    return {
      updatedTree: updatedTree,
      toggledNodes: nodesToDeactivate,
    };
  }

  const branch = getCheapestBranch(node);
  const newLocal = branch.reduce(
    (tree, { id }) => tree.set(id, { ...tree.get(id)!, isActive: true }),
    graph,
  );
  return {
    updatedTree: newLocal,
    toggledNodes: branch,
  };
};

export const groupByRow = (graph: Graph) =>
  Array.from(graph.values()).reduce<Map<number, GraphNode[]>>(
    (acc, node) => acc.set(node.row, [...(acc.get(node.row) || []), node]),
    new Map(),
  );
