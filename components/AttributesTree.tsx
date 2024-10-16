import HorizontalLine from "@/components/HorizontalLine";
import SkillTreeNode from "@/components/SkillTreeNode";
import { toggleNode } from "@/utils/tree";
import { Dispatch, SetStateAction } from "react";

interface AttributesTreeProps {
  tree: AttributeNode[][];
  setTree: Dispatch<SetStateAction<AttributeNode[][]>>;
}
export default function AttributesTree({ tree, setTree }: AttributesTreeProps) {
  return tree.map((row, rowIndex) => (
    <div key={rowIndex}>
      {row.some((node) =>
        node.parentsIds.some((id) => id.charAt(0) !== node.id.charAt(0)),
      ) && <HorizontalLine topRow={tree.at(rowIndex - 1)!} bottomRow={row} />}
      <div key={row[0].id} className="grid grid-cols-3 gap-8">
        {row.map((node) => (
          <SkillTreeNode
            key={node.id}
            tree={tree}
            node={node}
            toggleNode={() => toggleNode(node, setTree)}
          />
        ))}
      </div>
    </div>
  ));
}
