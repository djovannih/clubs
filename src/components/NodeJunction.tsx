import type { Graph, GraphNode } from "@/lib/graph";
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
    (node) => topNode && node?.parentIds.some((p) => p === topNode.id),
  );
  const topEdgeIsActive =
    showTopEdge &&
    topNode?.isActive &&
    bottomRow.some(
      (node) => node.parentIds.some((p) => p === topNode.id) && node.isActive,
    );

  const showBottomEdge = bottomNode && bottomNode.parentIds.length > 0;
  const bottomEdgeIsActive = showBottomEdge && bottomNode?.isActive;

  const showLeftEdge =
    topRow.some(
      (tn) =>
        tn.column < columnIndex &&
        tn.childrenIds.some((child) => tree.get(child)!.column >= columnIndex),
    ) ||
    bottomRow.some(
      (bn) =>
        bn.column < columnIndex &&
        topRow.some(
          (tn) => tn.column >= columnIndex && tn.childrenIds.includes(bn.id),
        ),
    );
  const leftEdgeIsActive =
    showLeftEdge &&
    (topRow.some(
      (tn) =>
        tn.column >= columnIndex &&
        tn.isActive &&
        bottomRow.some(
          (bn) =>
            bn.column < columnIndex &&
            bn.isActive &&
            bn.parentIds.some((p) => p === tn.id),
        ),
    ) ||
      topRow.some(
        (tn) =>
          tn.column < columnIndex &&
          tn.isActive &&
          bottomRow.some(
            (bn) =>
              bn.column >= columnIndex &&
              bn.isActive &&
              bn.parentIds.some((p) => p === tn.id),
          ),
      ));

  const showRightEdge =
    topRow.some(
      (node) =>
        node.column > columnIndex &&
        node.childrenIds.some(
          (child) => tree.get(child)!.column <= columnIndex,
        ),
    ) ||
    bottomRow.some(
      (bn) =>
        bn.column > columnIndex &&
        topRow.some(
          (tn) => tn.column <= columnIndex && tn.childrenIds.includes(bn.id),
        ),
    );
  const rightEdgeIsActive =
    showRightEdge &&
    (topRow.some(
      (tn) =>
        tn.column <= columnIndex &&
        tn.isActive &&
        bottomRow.some(
          (bn) =>
            bn.column > columnIndex &&
            bn.isActive &&
            bn.parentIds.some((p) => p === tn.id),
        ),
    ) ||
      topRow.some(
        (tn) =>
          tn.column > columnIndex &&
          tn.isActive &&
          bottomRow.some(
            (bn) =>
              bn.column <= columnIndex &&
              bn.isActive &&
              bn.parentIds.some((p) => p === tn.id),
          ),
      ));

  return (
    <div className="grid grow grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]">
      {showTopEdge && (
        <div
          className={clsx(
            "col-start-2 row-start-1 h-8 w-2 justify-self-center",
            topEdgeIsActive ? "bg-green-600" : "bg-slate-700",
          )}
        ></div>
      )}
      {showLeftEdge && (
        <div
          className={clsx(
            "col-start-1 row-start-2 h-2 self-center",
            leftEdgeIsActive ? "bg-green-600" : "bg-slate-700",
          )}
        ></div>
      )}
      {(showTopEdge || showLeftEdge || showRightEdge || showBottomEdge) && (
        <div
          className={clsx(
            "col-start-2 row-start-2 h-2 w-2 self-center",
            topEdgeIsActive ||
              leftEdgeIsActive ||
              rightEdgeIsActive ||
              bottomEdgeIsActive
              ? "bg-green-600"
              : "bg-slate-700",
          )}
        ></div>
      )}
      {showRightEdge && (
        <div
          className={clsx(
            "col-start-3 row-start-2 h-2 self-center",
            rightEdgeIsActive ? "bg-green-600" : "bg-slate-700",
          )}
        ></div>
      )}
      {showBottomEdge && (
        <div
          className={clsx(
            "col-start-2 row-start-3 h-8 w-2 justify-self-center",
            bottomEdgeIsActive ? "bg-green-600" : "bg-slate-700",
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
    <div className="grid grid-cols-3">
      {[
        ...{ length: columnsCount },
        (_, i) => (
          <Junction
            key={i}
            tree={tree}
            topRow={topRow}
            bottomRow={bottomRow}
            columnIndex={i}
          />
        ),
      ]}
    </div>
  );
}
