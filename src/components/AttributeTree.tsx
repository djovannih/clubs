import AttributeNode from "@/components/AttributeNode";
import NodeJunction from "@/components/NodeJunction";
import { type Graph, groupByRow } from "@/lib/graph";
import { useAtom, type WritableAtom } from "jotai";

interface AttributeTreeProps {
  treeAtom: WritableAtom<Graph, [nodeId: string], void>;
}

export default function AttributeTree({ treeAtom }: AttributeTreeProps) {
  const [tree, toggleNode] = useAtom(treeAtom);

  const rows = groupByRow(tree);
  const columnsCount =
    Array.from(tree.values()).reduce(
      (acc, node) => (node.column > acc ? node.column : acc),
      0,
    ) + 1;

  return (
    <div className="mb-32">
      {Array.from(rows.entries()).map(([rowIndex, row]) => (
        <div key={rowIndex}>
          {rowIndex > 0 && (
            <NodeJunction
              tree={tree}
              topRow={rows.get(rowIndex - 1)!}
              bottomRow={row}
            />
          )}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
            }}
          >
            {row.map((node) => (
              <AttributeNode
                key={node.id}
                node={node}
                toggleNode={() => toggleNode(node.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
