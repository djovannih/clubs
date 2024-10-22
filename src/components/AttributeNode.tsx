import Badge from "@/components/Badge";
import { GraphNode } from "@/lib/graph";
import clsx from "clsx";

interface AttributeNodeProps {
  node: GraphNode;
  toggleNode: () => void;
}
export default function AttributeNode({
  node,
  toggleNode,
}: AttributeNodeProps) {
  return (
    <div
      className="items-between z-10 mx-4 flex h-full flex-col"
      style={{ gridColumnStart: node.column + 1 }}
    >
      <button
        className={clsx(
          "relative rounded-lg p-4",
          node.isActive ? "bg-primary-dark" : "bg-inactive-node",
        )}
        onClick={toggleNode}
      >
        <ul className="flex min-h-[2lh] grow flex-col items-center justify-center rounded-sm text-sm">
          {node.actions.map((action) => (
            <li
              key={action.attribute}
            >{`${action.attribute} +${action.value}`}</li>
          ))}
        </ul>
        <Badge>{node.activationCost}</Badge>
      </button>
    </div>
  );
}
