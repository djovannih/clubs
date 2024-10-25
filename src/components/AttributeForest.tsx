import { forestsAtom } from "@/atoms/forest";
import AttributeTree from "@/components/AttributeTree";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useState } from "react";

interface AttributeForestProps {
  forestName: MainAttributeName;
}

export default function AttributeForest({ forestName }: AttributeForestProps) {
  const forest = useAtomValue(forestsAtom).get(forestName)!;
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);

  return (
    <>
      <div className="my-8 flex bg-background">
        {forest.map((_, i) => (
          <button
            key={`${forestName}-${i}`}
            onClick={() => setActiveTreeIndex(i)}
            className={clsx(
              "grow p-2",
              activeTreeIndex === i ? "bg-highlight-dark" : "bg-node-locked",
            )}
          >{`Tab ${i + 1}`}</button>
        ))}
      </div>
      <AttributeTree forestName={forestName} treeIndex={activeTreeIndex} />
    </>
  );
}
