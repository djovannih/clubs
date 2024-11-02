import type { Tree, TreeNode } from "@/atoms/player";
import AttributeNode from "@/components/AttributeNode";
import NodeJunction from "@/components/NodeJunction";

interface AttributeTreeProps {
  tree: Tree;
}

export default function AttributeTree({ tree }: AttributeTreeProps) {
  const rows = [...tree.values()].reduce(
    (acc, node) => acc.set(node.row, [...(acc.get(node.row) || []), node]),
    new Map<number, TreeNode[]>(),
  );

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
              <AttributeNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
