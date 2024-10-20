import { getChildren, Graph, GraphNode } from "@/lib/graph";
import clsx from "clsx";
import { useSetAtom } from "jotai";

interface AttributeNodeProps {
  tree: Graph;
  node: GraphNode;
  toggleNode: () => void;
}
export default function AttributeNode({
  tree,
  node,
  toggleNode,
}: AttributeNodeProps) {
  const hasParents = node.parentIds.length > 0;
  const children = getChildren(tree, node.id);

  const showTopRow = hasParents;
  const showBottomRow = children.length > 0;

  return (
    <div
      className={clsx(
        "z-10 col-start-1 flex flex-col items-center",
        !showTopRow && "self-end",
        !showBottomRow && "self-start",
      )}
      style={{ gridColumnStart: node.column + 1 }}
    >
      {showTopRow && (
        <div
          className={clsx(
            "-mt-1 h-9 w-2",
            node.isActive ? "bg-primary-dark" : "bg-inactive-node",
          )}
        ></div>
      )}
      <button
        className={clsx(
          "size-8 disabled:cursor-not-allowed",
          node.isActive ? "bg-primary-dark" : "bg-inactive-node",
        )}
        onClick={toggleNode}
      >
        {node.id}
      </button>
      {showBottomRow && (
        <div
          className={clsx(
            "-mb-1 h-9 w-2",
            node.isActive && children.some((child) => child.isActive)
              ? "bg-primary-dark"
              : "bg-inactive-node",
          )}
        ></div>
      )}
    </div>
  );
}
