import { Graph, GraphNode, groupByRow } from "@/lib/graph";
import AttributeNode from "@/components/AttributeNode";
import TreeEdge from "@/components/TreeEdge";

interface AttributeTreeProps {
  tree: Graph;
  toggleNode: (nodeId: string) => void;
}

export default function AttributeTree({
  tree,
  toggleNode,
}: AttributeTreeProps) {
  const showEdge = (row: GraphNode[]) =>
    row.some((node) =>
      node.parentIds.some(
        (pid) => tree.get(pid)?.column !== tree.get(node.id)?.column,
      ),
    );

  const rows = groupByRow(tree);
  const columnsCount =
    tree
      .values()
      .reduce((acc, node) => (node.column > acc ? node.column : acc), 0) + 1;

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
