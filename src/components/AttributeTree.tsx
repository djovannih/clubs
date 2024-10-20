import { type Graph, type GraphNode, groupByRow } from "@/lib/graph";
import AttributeNode from "@/components/AttributeNode";
import TreeEdge from "@/components/TreeEdge";
import { useAtom, type WritableAtom } from "jotai";

interface AttributeTreeProps {
  treeAtom: WritableAtom<Graph, [nodeId: string], void>;
}

export default function AttributeTree({ treeAtom }: AttributeTreeProps) {
  const [tree, toggleNode] = useAtom(treeAtom);

  const showEdge = (row: GraphNode[]) =>
    row.some((node) =>
      node.parentIds.some(
        (pid) => tree.get(pid)?.column !== tree.get(node.id)?.column,
      ),
    );

  const rows = groupByRow(tree);
  const columnsCount =
    Array.from(tree.values()).reduce(
      (acc, node) => (node.column > acc ? node.column : acc),
      0,
    ) + 1;

  return Array.from(rows.entries()).map(([rowIndex, row]) => (
    <div key={rowIndex}>
      {showEdge(row) && (
        <TreeEdge topRow={rows.get(rowIndex - 1)!} bottomRow={row} />
      )}
      <div
        className="grid grid-cols-3 gap-8"
        style={{
          gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
        }}
      >
        {row.map((node) => (
          <AttributeNode
            key={node.id}
            tree={tree}
            node={node}
            toggleNode={() => toggleNode(node.id)}
          />
        ))}
      </div>
    </div>
  ));
}
