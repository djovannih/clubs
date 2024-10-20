import AttributeTree from "@/components/AttributeTree";
import { type Graph } from "@/lib/graph";
import clsx from "clsx";
import { type WritableAtom } from "jotai";
import { useState } from "react";

interface AttributeForestProps {
  forest: WritableAtom<Graph, [nodeId: string], void>[];
}

export default function AttributeForest({ forest }: AttributeForestProps) {
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);

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
      <AttributeTree treeAtom={forest.at(activeTreeIndex)!} />
    </>
  );
}
