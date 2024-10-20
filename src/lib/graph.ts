export type GraphNode = {
  id: string;
  activationCost: number;
  isActive: boolean;
  parentIds: string[];
  row: number;
  column: number;
};

export type Graph = Map<string, GraphNode>;

export type Forest = Graph[];

export const getChildren = (graph: Graph, nodeId: string) =>
  Array.from(
    Array.from(graph.values()).filter((node) =>
      node.parentIds.includes(nodeId),
    ),
  );

const getCheapestParentId = (graph: Graph, nodeId: string) =>
  graph
    .get(nodeId)!
    .parentIds.reduce((cheapestId, parentId) =>
      graph.get(parentId)!.activationCost <
      graph.get(cheapestId)!.activationCost
        ? parentId
        : cheapestId,
    );

const activateNode = (graph: Graph, nodeId: string): Graph => {
  const node = graph.get(nodeId)!;

  const hasActiveParent = node.parentIds.some(
    (parentId) => graph.get(parentId)?.isActive,
  );

  const updatedGraph = new Map(graph.set(nodeId, { ...node, isActive: true }));

  return !hasActiveParent && node.parentIds.length > 0
    ? activateNode(updatedGraph, getCheapestParentId(updatedGraph, nodeId))
    : updatedGraph;
};

const deactivateNode = (graph: Graph, nodeId: string): Graph => {
  const node = graph.get(nodeId)!;

  const childrenToDeactivate = getChildren(graph, nodeId).filter(
    (child) =>
      child.isActive &&
      !child.parentIds.some(
        (pid) => pid !== nodeId && graph.get(pid)!.isActive,
      ),
  );

  let updatedGraph = new Map(graph.set(nodeId, { ...node, isActive: false }));
  for (const child of childrenToDeactivate)
    updatedGraph = new Map(deactivateNode(updatedGraph, child.id));

  return updatedGraph;
};

export const toggleNode = (graph: Graph, nodeId: string) =>
  graph.get(nodeId)!.isActive
    ? deactivateNode(graph, nodeId)
    : activateNode(graph, nodeId);

export const groupByRow = (graph: Graph) =>
  Array.from(graph.values()).reduce<Map<number, GraphNode[]>>(
    (acc, node) => acc.set(node.row, [...(acc.get(node.row) || []), node]),
    new Map(),
  );
