import { Graph, GraphNode, groupByRow } from "@/lib/graph";
import AttributeNode from "./AttributeNode";
import TreeEdge from "./TreeEdge";

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

  return Array.from(rows.entries()).map(([rowIndex, row]) => (
    <div key={rowIndex}>
      {showEdge(row) && (
        <TreeEdge topRow={rows.get(rowIndex - 1)!} bottomRow={row} />
      )}
      <div className="grid grid-cols-3 gap-8">
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
