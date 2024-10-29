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
  new Map(
    nodes.reduce((tree, node) => addNode(tree, node), new Map()),
  ) as Graph;

export const getCheapestBranch = (
  startNode: GraphNode,
  graph: Graph,
): GraphNode[] => {
  const getAllBranches = (startNode: GraphNode): GraphNode[][] => {
    if (startNode.isActive) return [[]];
    return startNode.parentIds.length === 0
      ? [[startNode]]
      : startNode.parentIds
          .flatMap((parentId) => getAllBranches(graph.get(parentId)!))
          .map((path) => [startNode, ...path]);
  };

  const getBranchCost = (nodes: GraphNode[]) =>
    nodes.reduce((totalCost, node) => totalCost + node.activationCost, 0);

  const allBranches = getAllBranches(startNode);
  return allBranches.reduce((cheapestBranch, branch) =>
    getBranchCost(branch) < getBranchCost(cheapestBranch)
      ? branch
      : cheapestBranch,
  );
};

const deactivateNode = (
  node: GraphNode,
  graph: Graph,
  toggledNodes: GraphNode[] = [],
) => {
  graph.set(node.id, { ...graph.get(node.id)!, isActive: false });
  toggledNodes.push(node);
  node.childrenIds.forEach((childId) => {
    const childNode = graph.get(childId)!;
    const hasActiveParent = childNode.parentIds.some(
      (parentId) => graph.get(parentId)!.isActive,
    );
    if (childNode.isActive && !hasActiveParent)
      deactivateNode(childNode, graph, toggledNodes);
  });

  return {
    updatedTree: graph,
    toggledNodes,
  };
};

const activateNode = (node: GraphNode, graph: Graph) => {
  const branch = getCheapestBranch(node, graph);
  const updatedTree = branch.reduce(
    (tree, { id }) => tree.set(id, { ...tree.get(id)!, isActive: true }),
    graph,
  );
  return {
    updatedTree: updatedTree,
    toggledNodes: branch,
  };
};

export const toggleNode = (graph: Graph, node: GraphNode) =>
  node.isActive ? deactivateNode(node, graph) : activateNode(node, graph);

export const groupByRow = (graph: Graph) =>
  Array.from(graph.values()).reduce<Map<number, GraphNode[]>>(
    (acc, node) => acc.set(node.row, [...(acc.get(node.row) || []), node]),
    new Map(),
  );
