"use client";

import { paceForestAtom } from "@/atoms/pace";
import { shootingForestAtom } from "@/atoms/shooting";
import AttributeDetail from "@/components/AttributeDetail";
import AttributeForest from "@/components/AttributeForest";
import type { Graph } from "@/lib/graph";
import type { AttributeCategory } from "@/lib/player";
import clsx from "clsx";
import type { WritableAtom } from "jotai";
import { useState } from "react";

const forestByName = new Map<
  AttributeCategory,
  WritableAtom<Graph, [nodeId: string], void>[]
>([
  ["pace", paceForestAtom],
  ["shooting", shootingForestAtom],
]);

export default function AttributeEditor() {
  const [activeForestKey, setActiveForestKey] = useState(
    forestByName.keys().next().value!,
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mb-4 text-center text-3xl font-bold uppercase">
        Attributes
      </h2>
      <div className="grid grid-cols-3 justify-between bg-background">
        {Array.from(forestByName.keys()).map((name) => (
          <button
            key={name}
            onClick={() => setActiveForestKey(name)}
            className={clsx(
              "p-2",
              name === activeForestKey ? "bg-highlight-dark" : "bg-node-locked",
            )}
          >
            {name}
          </button>
        ))}
      </div>
      <AttributeForest forest={forestByName.get(activeForestKey)!} />
      <AttributeDetail category={activeForestKey} />
    </div>
  );
}
