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
  new Map(nodes.reduce((treee, node) => addNode(treee, node), new Map()));

const getCheapestParent = (node: GraphNode) =>
  node.parents.reduce((cheapest, parent) =>
    parent.activationCost < cheapest.activationCost ? parent : cheapest,
  );

const activateNode = (graph: Graph, node: GraphNode): Graph => {
  const hasActiveParent = node.parents.some((parent) => parent.isActive);
  const updatedGraph = new Map(graph.set(node.id, { ...node, isActive: true }));

  return !hasActiveParent && node.parents.length > 0
    ? activateNode(updatedGraph, getCheapestParent(node))
    : updatedGraph;
};

const deactivateNode = (graph: Graph, node: GraphNode): Graph => {
  const childrenToDeactivate = node.children.filter(
    (child) =>
      child.isActive &&
      !child.parents.some((parent) => parent.id !== node.id && parent.isActive),
  );

  return childrenToDeactivate.reduce(
    (tree, child) => new Map(deactivateNode(tree, child)),
    new Map(graph.set(node.id, { ...node, isActive: false })),
  );
};

export const toggleNode = (graph: Graph, node: GraphNode) =>
  node.isActive ? deactivateNode(graph, node) : activateNode(graph, node);

export const groupByRow = (graph: Graph) =>
  Array.from(graph.values()).reduce<Map<number, GraphNode[]>>(
    (acc, node) => acc.set(node.row, [...(acc.get(node.row) || []), node]),
    new Map(),
  );
