import { forestsAtom } from "@/atoms/forest";
import AttributeNode from "@/components/AttributeNode";
import NodeJunction from "@/components/NodeJunction";
import { groupByRow } from "@/lib/graph";
import type { AttributeCategoryName } from "@/lib/player";
import { useAtomValue } from "jotai";

interface AttributeTreeProps {
  forestName: AttributeCategoryName;
  treeIndex: number;
}

export default function AttributeTree({
  forestName,
  treeIndex,
}: AttributeTreeProps) {
  const forest = useAtomValue(useAtomValue(forestsAtom).get(forestName)!);
  const tree = forest.at(treeIndex)!;

  const rows = groupByRow(tree);
  const columnsCount =
  [...tree.values()].reduce(
      (acc, node) => (node.column > acc ? node.column : acc),
      0,
    ) + 1;

  return (
    <div className="lg:mx-auto lg:basis-2/3">
      {[...rows.entries()].map(([rowIndex, row]) => (
        <div key={rowIndex}>
          {rowIndex > 0 && (
            <NodeJunction
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
