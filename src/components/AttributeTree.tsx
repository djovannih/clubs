import { playerAtom } from "@/atoms/player";
import AttributeNode from "@/components/AttributeNode";
import NodeJunction from "@/components/NodeJunction";
import { type Graph, type GraphNode, groupByRow } from "@/lib/graph";
import { useAtom, useAtomValue, type WritableAtom } from "jotai";

interface AttributeTreeProps {
  treeAtom: WritableAtom<Graph, [node: GraphNode], void>;
  nodeCosts: Map<string, number>;
}

export default function AttributeTree({
  treeAtom,
  nodeCosts,
}: AttributeTreeProps) {
  const [tree, toggleNode] = useAtom(treeAtom);
  const player = useAtomValue(playerAtom);

  const rows = groupByRow(tree);
  const columnsCount =
    Array.from(tree.values()).reduce(
      (acc, node) => (node.column > acc ? node.column : acc),
      0,
    ) + 1;

  return (
    <div>
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
                toggleNode={() => toggleNode(node)}
                disabled={nodeCosts.get(node.id)! > player.availableSkillPoints}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
