import type { AttributeName } from "@/atoms/player";

export type GraphNode = {
  id: string;
  baseActivationCost: number;
  isActive: boolean;
  parentIds: string[];
  childrenIds: string[];
  row: number;
  column: number;
  modifiers: Map<AttributeName, number>;
};

export type Graph = Map<string, GraphNode>;

type NodeInfo = Omit<GraphNode, "id" | "isActive" | "childrenIds">;

const addNode = (tree: Graph, nodeInfo: NodeInfo) => {
  const node: GraphNode = {
    id: `${String.fromCharCode(65 + nodeInfo.column)}${nodeInfo.row + 1}`,
    row: nodeInfo.row,
    column: nodeInfo.column,
    baseActivationCost: nodeInfo.baseActivationCost,
    isActive: false,
    modifiers: nodeInfo.modifiers,
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
