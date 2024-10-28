import { forestsAtom } from "@/atoms/forest";
import AttributeNode from "@/components/AttributeNode";
import NodeJunction from "@/components/NodeJunction";
import { groupByRow } from "@/lib/graph";
import type { MainAttributeName } from "@/lib/player";
import { useAtomValue } from "jotai";

interface AttributeTreeProps {
  forestName: MainAttributeName;
  treeIndex: number;
}

export default function AttributeTree({
  forestName,
  treeIndex,
}: AttributeTreeProps) {
  const forest = useAtomValue(forestsAtom).get(forestName)!;
  const tree = forest.at(treeIndex)!;

  const rows = groupByRow(tree);
  const columnsCount =
    Array.from(tree.values()).reduce(
      (acc, node) => (node.column > acc ? node.column : acc),
      0,
    ) + 1;

  return (
    <div>
      {Array.from(rows.entries()).map(([rowIndex, row]) => (
        <div key={`${forestName}-${treeIndex}-${rowIndex}`}>
          {rowIndex > 0 && (
            <NodeJunction
              key={`${forestName}-${treeIndex}-${rowIndex}`}
              tree={tree}
              topRow={rows.get(rowIndex - 1)!}
              bottomRow={row}
            />
          )}
          <div
            className="grid gap-x-6"
            style={{
              gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
            }}
          >
            {row.map((node) => (
              <AttributeNode
                key={node.id}
                forestName={forestName}
                treeIndex={treeIndex}
                nodeId={node.id}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
