import { GraphNode } from "@/lib/graph";
import clsx from "clsx";

interface TreeEdgeProps {
  topRow: GraphNode[];
  bottomRow: GraphNode[];
}

export default function TreeEdge({ topRow, bottomRow }: TreeEdgeProps) {
  const drawFirstSegment = bottomRow
    .filter(({ column }) => column > 0)
    .some(({ parentIds }) => parentIds.some((id) => id.charAt(0) === "A"));

  const firstSegmentSelected =
    (topRow.at(0)?.isActive &&
      bottomRow.some((node) => node.column > 0 && node.isActive)) ||
    (topRow.some((node) => node.column > 0 && node.isActive) &&
      bottomRow.at(0)?.isActive);

  const drawSecondSegment = bottomRow
    .at(2)
    ?.parentIds.some((id) => id.charAt(0) !== "C");

  const secondSegmentSelected =
    (topRow.find(({ column }) => column === 2)?.isActive &&
      bottomRow.some((node) => node.column < 2 && node.isActive)) ||
    (topRow.some((node) => node.column < 2 && node.isActive) &&
      bottomRow.find(({ column }) => column === 2)?.isActive);

  return (
    <div className="mx-3 grid grid-cols-2">
      {drawFirstSegment && (
        <div
          className={clsx(
            "col-start-1 h-2",
            firstSegmentSelected ? "z-20 bg-green-600" : "bg-gray-500",
            firstSegmentSelected &&
              !secondSegmentSelected &&
              "w-[calc(100%+0.25rem)]",
          )}
        ></div>
      )}
      {drawSecondSegment && (
        <div
          className={clsx(
            "col-start-2 h-2",
            secondSegmentSelected ? "z-20 bg-green-600" : "bg-gray-500",
            !firstSegmentSelected &&
              secondSegmentSelected &&
              "-ml-[0.25rem] w-[calc(100%+0.25rem)]",
          )}
        ></div>
      )}
    </div>
  );
}
