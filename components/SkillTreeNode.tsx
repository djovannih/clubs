import clsx from "clsx";

interface SkillTreeNodeProps {
  tree: AttributeNode[][];
  node: AttributeNode;
  toggleNode: (node: AttributeNode) => void;
}
export default function SkillTreeNode({
  node,
  tree,
  toggleNode,
}: SkillTreeNodeProps) {
  const hasParents = node.parentsIds.length > 0;
  const children =
    tree
      .at(node.row + 1)
      ?.filter(({ parentsIds }) => parentsIds.includes(node.id)) || [];
  const requirementsSatisfied =
    !hasParents ||
    tree
      .at(node.row - 1)
      ?.some(({ id, selected }) => node.parentsIds.includes(id) && selected);

  const showTopRow = hasParents;
  const showBottomRow = children.length > 0;

  return (
    <div
      className={clsx(
        "z-10 flex flex-col items-center",
        !showTopRow && "self-end",
        !showBottomRow && "self-start",
        node.column === 0 && "col-start-1",
        node.column === 1 && "col-start-2",
        node.column === 2 && "col-start-3",
      )}
    >
      {showTopRow && (
        <div
          className={clsx(
            "-mt-1 h-9 w-2",
            node.selected ? "bg-green-600" : "bg-gray-500",
          )}
        ></div>
      )}
      <button
        className={clsx(
          "size-8 disabled:cursor-not-allowed",
          node.selected ? "bg-green-600" : "bg-gray-500",
        )}
        onClick={() => toggleNode(node)}
        disabled={!requirementsSatisfied}
      >
        {node.id}
      </button>
      {showBottomRow && (
        <div
          className={clsx(
            "-mb-1 h-9 w-2",
            node.selected && children.some((child) => child.selected)
              ? "bg-green-600"
              : "bg-gray-500",
          )}
        ></div>
      )}
    </div>
  );
}
