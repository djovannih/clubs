"use client";

import { paceForestAtom } from "@/atoms/pace";
import { shootingForestAtom } from "@/atoms/shooting";
import AttributeForest from "@/components/AttributeForest";
import clsx from "clsx";
import { useState } from "react";

const forestByName = new Map([
  ["Pace", paceForestAtom],
  ["Shooting", shootingForestAtom],
]);

export default function AttributeEditor() {
  const [activeForestKey, setActiveForestKey] = useState(
    forestByName.keys().next().value!,
  );

  return (
    <>
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
    </>
  );
}
