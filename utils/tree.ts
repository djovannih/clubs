import { Dispatch, SetStateAction } from "react";

const updateTree = (currentTree: AttributeNode[][], node: AttributeNode) => {
  const newTree: AttributeNode[][] = currentTree.map((row) =>
    row.map((n) => ({ ...n }))
  );

  const currentNode = newTree.at(node.row)!.find(({ id }) => id === node.id)!;
  currentNode.selected = !currentNode.selected;

  const hasSelectedParent = (childNode: AttributeNode) => {
    return childNode.parentsIds.some((parentId) =>
      newTree.some((row) =>
        row.some((parent) => parent.id === parentId && parent.selected)
      )
    );
  };

  const unselectChildren = (parentNode: AttributeNode) => {
    newTree.forEach((row) => {
      row.forEach((childNode) => {
        if (
          childNode.parentsIds.includes(parentNode.id) &&
          !hasSelectedParent(childNode)
        ) {
          childNode.selected = false;
          unselectChildren(childNode);
        }
      });
    });
  };

  if (!currentNode.selected) unselectChildren(currentNode);

  return newTree;
};

export const toggleNode = (
  node: AttributeNode,
  setTree: Dispatch<SetStateAction<AttributeNode[][]>>
) => {
  setTree((prevTree) => updateTree(prevTree, node));
};
