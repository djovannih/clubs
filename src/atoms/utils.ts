import type { Graph } from "@/lib/graph";
import type { MainAttributeName } from "@/lib/player";

export const jsonStorageOptions: {
  reviver?: (key: string, value: unknown) => unknown;
  replacer?: (key: string, value: unknown) => unknown;
} = {
  replacer: (_, value) =>
    value instanceof Map
      ? {
          dataType: "Map",
          value: Array.from(value.entries()),
        }
      : value,
  reviver: (_, value) =>
    typeof value === "object" &&
    value !== null &&
    (value as { dataType: string; value: unknown }).dataType === "Map"
      ? new Map((value as { value: Map<unknown, unknown> }).value)
      : value,
};

export const resetAttributeTrees = (
  forests: Map<MainAttributeName, Graph[]>,
  toggleNode: (
    forestName: MainAttributeName,
    treeIndex: number,
    nodeId: string,
  ) => void,
) => {
  Array.from(forests.entries()).forEach(([forestName, forest]) =>
    forest.forEach((tree, treeIndex) =>
      tree.forEach((node) => {
        if (node.parentIds.length === 0 && node.isActive)
          toggleNode(forestName, treeIndex, node.id);
      }),
    ),
  );
};

export const reapplyActivatedNodes = (
  forests: Map<MainAttributeName, Graph[]>,
  toggleNode: (
    forestName: MainAttributeName,
    treeIndex: number,
    nodeId: string,
  ) => void,
) => {
  return Array.from(forests.entries()).flatMap(([forestName, forest]) =>
    forest.flatMap((tree, treeIndex) =>
      Array.from(tree.values())
        .filter(
          (node) =>
            node.isActive &&
            !node.childrenIds.some(
              (childId) =>
                forests.get(forestName)!.at(treeIndex)!.get(childId)!.isActive,
            ),
        )
        .map((leaf) => () => toggleNode(forestName, treeIndex, leaf.id)),
    ),
  );
};
