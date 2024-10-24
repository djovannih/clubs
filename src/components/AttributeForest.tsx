import { nodeCosts as nodeCostsAtom } from "@/atoms/pace";
import AttributeTree from "@/components/AttributeTree";
import type { GraphNode, Graph } from "@/lib/graph";
import clsx from "clsx";
import { useAtomValue, type WritableAtom } from "jotai";
import { useState } from "react";

interface AttributeForestProps {
  forest: WritableAtom<Graph, [node: GraphNode], void>[];
}

export default function AttributeForest({ forest }: AttributeForestProps) {
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);
  const nodeCostsByForest = useAtomValue(nodeCostsAtom);

  return (
    <>
      <div className="my-8 flex bg-background">
        {forest.map((treeAtom, i) => (
          <button
            key={`${treeAtom}`}
            onClick={() => setActiveTreeIndex(i)}
            className={clsx(
              "grow p-2",
              activeTreeIndex === i ? "bg-highlight-dark" : "bg-node-locked",
            )}
          >{`Tab ${i + 1}`}</button>
        ))}
      </div>
      <AttributeTree
        treeAtom={forest.at(activeTreeIndex)!}
        nodeCosts={nodeCostsByForest.at(activeTreeIndex)!}
      />
    </>
  );
}
