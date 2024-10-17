"use client";

import AttributeTree from "@/components/AttributeTree";
import { activateNode, deactivateNode, Graph } from "@/lib/graph";
import { paceTree } from "@/lib/trees";
import { useState } from "react";

export default function Character() {
  const [tree, setTree] = useState<Graph>(paceTree);

  const toggleNode = (nodeId: string) => {
    const node = tree.get(nodeId);
    const updatedTree = !node
      ? tree
      : node.isActive
        ? deactivateNode(tree, nodeId)
        : activateNode(tree, nodeId);
    setTree(updatedTree);
  };

  return (
    <div className="mx-auto flex w-80 flex-col items-center">
      <AttributeTree tree={tree} toggleNode={toggleNode} />
    </div>
  );
}
