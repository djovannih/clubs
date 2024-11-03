import type { TreeNode } from "@/atoms/player";
import clsx from "clsx";
import { useAtomValue } from "jotai";

interface TreeEdgeProps {
  sourceNode: TreeNode;
  targetNode: TreeNode;
}

export default function TreeEdge({ sourceNode, targetNode }: TreeEdgeProps) {
  const sourceNodeIsActive = useAtomValue(sourceNode.isActive);
  const targetNodeIsActive = useAtomValue(targetNode.isActive);
  const backgroundColor =
    sourceNodeIsActive && targetNodeIsActive
      ? "bg-green-600 z-10"
      : "bg-slate-700 z-0";

  return (
    <div
      className={clsx(
        "absolute left-0 right-0 flex",
        sourceNode.column < targetNode.column && "mr-1 flex-row",
        sourceNode.column > targetNode.column && "ml-1 flex-row-reverse",
        sourceNode.column === targetNode.column &&
          sourceNode.column > 0 &&
          "mr-2",
      )}
    >
      {sourceNode.column === targetNode.column && (
        <div
          className={clsx(
            "absolute h-16 w-2",
            backgroundColor,
            sourceNode.column === 1 && "ml-[calc(50%-0.125rem)]",
            sourceNode.column === 2 && "ml-[100%]",
          )}
        />
      )}
      {sourceNode.column < targetNode.column && (
        <>
          <div
            className={clsx(
              "absolute h-8 w-2",
              backgroundColor,
              sourceNode.column === 1 && "ml-[calc(50%-0.25rem)]",
              sourceNode.column === 2 && "ml-[calc(100%-0.25rem)]",
            )}
          />
          <div
            className={clsx(
              "absolute mt-7 h-2",
              backgroundColor,
              targetNode.column - sourceNode.column === 1 &&
                sourceNode.column === 1 &&
                "w-[calc(50%+0.5rem)]",
              targetNode.column - sourceNode.column === 1 &&
                sourceNode.column !== 1 &&
                "w-[calc(50%+0.25rem)]",
              targetNode.column - sourceNode.column === 2 &&
                "w-[calc(100%+0.25rem)]",
              sourceNode.column === 1 && "ml-[calc(50%-0.25rem)]",
              sourceNode.column === 2 && "ml-[calc(100%-0.25rem)]",
            )}
          />
          <div
            className={clsx(
              "absolute mt-9 h-8 w-2",
              backgroundColor,
              targetNode.column === 1 && "ml-[calc(50%-0.25rem)]",
              targetNode.column === 2 && "ml-[calc(100%-0.25rem)]",
            )}
          />
        </>
      )}
      {sourceNode.column > targetNode.column && (
        <>
          <div
            className={clsx(
              "absolute h-8 w-2",
              backgroundColor,
              sourceNode.column === 1 && "mr-[50%]",
              sourceNode.column === 2 && "ml-[calc(100%-0.25rem)]",
            )}
          />
          <div
            className={clsx(
              "absolute mt-7 h-2",
              backgroundColor,
              sourceNode.column - targetNode.column === 1 &&
                targetNode.column === 1 &&
                "w-[calc(50%+0.5rem)]",
              sourceNode.column - targetNode.column === 1 &&
                targetNode.column !== 1 &&
                "w-[calc(50%+0.25rem)]",
              sourceNode.column - targetNode.column === 2 &&
                "w-[calc(100%+0.25rem)]",
              sourceNode.column === 1 && "mr-[50%]",
            )}
          />
          <div
            className={clsx(
              "absolute mt-9 h-8 w-2",
              backgroundColor,
              targetNode.column === 0 && "mr-[calc(100%-0.25rem)]",
              targetNode.column === 1 && "mr-[50%]",
              targetNode.column === 2 && "mr-[calc(100%-0.25rem)]",
            )}
          />
        </>
      )}
    </div>
  );
}
