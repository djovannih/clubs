import type { UpdateAttributeAction } from "./player";

export type GraphNode = {
  id: string;
  activationCost: number;
  isActive: boolean;
  parentIds: string[];
  childrenIds: string[];
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

type NodeInfo = Omit<GraphNode, "id" | "isActive" | "childrenIds">;

const addNode = (tree: Graph, nodeInfo: NodeInfo) => {
  const node: GraphNode = {
    id: `${String.fromCharCode(65 + nodeInfo.column)}${nodeInfo.row + 1}`,
    row: nodeInfo.row,
    column: nodeInfo.column,
    activationCost: nodeInfo.activationCost,
    isActive: false,
    actions: nodeInfo.actions,
    parentIds: nodeInfo.parentIds,
    childrenIds: [],
  };

  return new Map(
    nodeInfo.parentIds.reduce(
      (treeAcc, parentId) => {
        const parentNode = treeAcc.get(parentId)!;
        return treeAcc.set(parentId, {
          ...parentNode,
          childrenIds: [...parentNode.childrenIds, node.id],
        });
      },
      tree.set(node.id, node),
    ),
  );
};

export const createTree = (nodes: NodeInfo[]) =>
  new Map(nodes.reduce((tree, node) => addNode(tree, node), new Map()));

export const getCheapestBranch = (
  startNode: GraphNode,
  tree: Graph,
): GraphNode[] => {
  function findBranchToRoot(
    nodeId: string,
    currentBranch: GraphNode[] = [],
  ): GraphNode[] {
    const node = tree.get(nodeId)!;
    const branch = [node, ...currentBranch];

    if (node.isActive || node.parentIds.length === 0) return branch;

    let cheapestBranch: GraphNode[] = [];
    let minCost = Infinity;

    for (const parentId of node.parentIds) {
      const parentBranch = findBranchToRoot(parentId, branch);
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

  return findBranchToRoot(startNode.id);
};

export const toggleNode = (graph: Graph, node: GraphNode) => {
  if (node.isActive) {
    const getChildrenToDeactivate = (node: GraphNode): GraphNode[] => {
      const childrenToDeactivate = node.childrenIds
        .filter(
          (childId) =>
            graph.get(childId)!.isActive &&
            !graph
              .get(childId)!
              .parentIds.some((p) => p !== node.id && graph.get(p)!.isActive),
        )
        .map((childId) => graph.get(childId)!);
      const others = childrenToDeactivate.flatMap((child) =>
        getChildrenToDeactivate(child),
      );
      return [...childrenToDeactivate, ...others];
    };
    const nodesToDeactivate = [node, ...getChildrenToDeactivate(node)];
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

  const branch = getCheapestBranch(node, graph);
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
