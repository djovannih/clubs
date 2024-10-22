import { Graph, GraphNode } from "@/lib/graph";
import clsx from "clsx";

interface JunctionProps {
  tree: Graph;
  topRow: GraphNode[];
  bottomRow: GraphNode[];
  columnIndex: number;
}
const Junction = ({ tree, topRow, bottomRow, columnIndex }: JunctionProps) => {
  const topNode = topRow.find(({ column }) => column === columnIndex);
  const bottomNode = bottomRow.find(({ column }) => column === columnIndex);

  const showTopEdge = bottomRow.some(
    (node) => topNode && node?.parentIds.includes(topNode.id),
  );
  const topEdgeIsActive =
    showTopEdge &&
    topNode?.isActive &&
    bottomRow.some(
      (node) => node.parentIds.includes(topNode.id) && node.isActive,
    );

  const showBottomEdge = bottomNode && bottomNode.parentIds.length > 0;
  const bottomEdgeIsActive = showBottomEdge && bottomNode?.isActive;

  const showLeftEdge = bottomRow
    .filter((node) => node.column < columnIndex)
    .some((node) =>
      node?.parentIds.some((pid) => tree.get(pid)!.column >= columnIndex),
    );
  const leftEdgeIsActive =
    showLeftEdge &&
    (topRow.some(
      (topNode) =>
        topNode.column >= columnIndex &&
        topNode.isActive &&
        bottomRow.some(
          (bottomNode) =>
            bottomNode.column < columnIndex &&
            bottomNode.isActive &&
            bottomNode.parentIds.includes(topNode.id),
        ),
    ) ||
      topRow.some(
        (topNode) =>
          topNode.column < columnIndex &&
          topNode.isActive &&
          bottomRow.some(
            (bottomNode) =>
              bottomNode.column >= columnIndex &&
              bottomNode.isActive &&
              bottomNode.parentIds.includes(topNode.id),
          ),
      ));

  const showRightEdge = bottomRow
    .filter((node) => node.column > columnIndex)
    .some((node) =>
      node?.parentIds.some((pid) => tree.get(pid)!.column <= columnIndex),
    );
  const rightEdgeIsActive =
    showRightEdge &&
    (topRow.some(
      (topNode) =>
        topNode.column <= columnIndex &&
        topNode.isActive &&
        bottomRow.some(
          (bottomNode) =>
            bottomNode.column > columnIndex &&
            bottomNode.isActive &&
            bottomNode.parentIds.includes(topNode.id),
        ),
    ) ||
      topRow.some(
        (topNode) =>
          topNode.column > columnIndex &&
          topNode.isActive &&
          bottomRow.some(
            (bottomNode) =>
              bottomNode.column <= columnIndex &&
              bottomNode.isActive &&
              bottomNode.parentIds.includes(topNode.id),
          ),
      ));

  return (
    <div className="grid grow grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]">
      {showTopEdge && (
        <div
          className={clsx(
            "col-start-2 row-start-1 h-8 w-2 justify-self-center bg-inactive-node",
            topEdgeIsActive && "bg-primary-dark",
          )}
        ></div>
      )}
      {showLeftEdge && (
        <div
          className={clsx(
            "col-start-1 row-start-2 h-2 self-center bg-inactive-node",
            leftEdgeIsActive && "bg-primary-dark",
          )}
        ></div>
      )}
      {(showTopEdge || showLeftEdge || showRightEdge || showBottomEdge) && (
        <div
          className={clsx(
            "col-start-2 row-start-2 h-2 w-2 self-center bg-inactive-node",
            (topEdgeIsActive ||
              leftEdgeIsActive ||
              rightEdgeIsActive ||
              bottomEdgeIsActive) &&
              "bg-primary-dark",
          )}
        ></div>
      )}
      {showRightEdge && (
        <div
          className={clsx(
            "col-start-3 row-start-2 h-2 self-center bg-inactive-node",
            rightEdgeIsActive && "bg-primary-dark",
          )}
        ></div>
      )}
      {showBottomEdge && (
        <div
          className={clsx(
            "col-start-2 row-start-3 h-8 w-2 justify-self-center bg-inactive-node",
            bottomEdgeIsActive && "bg-primary-dark",
          )}
        ></div>
      )}
    </div>
  );
};

interface NodeJunctionProps {
  tree: Graph;
  topRow: GraphNode[];
  bottomRow: GraphNode[];
}
export default function NodeJunction({
  tree,
  topRow,
  bottomRow,
}: NodeJunctionProps) {
  const columnsCount =
    Math.max(
      ...topRow.map(({ column }) => column),
      ...bottomRow.map(({ column }) => column),
    ) + 1;

  return (
    <div className="flex justify-between">
      {Array.from({ length: columnsCount }, (_, i) => (
        <Junction
          key={i}
          tree={tree}
          topRow={topRow}
          bottomRow={bottomRow}
          columnIndex={i}
        />
      ))}
    </div>
  );
}
