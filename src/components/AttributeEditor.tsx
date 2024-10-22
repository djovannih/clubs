"use client";

import { paceForestAtom } from "@/atoms/pace";
import { categoryAttributesAtom } from "@/atoms/player";
import { shootingForestAtom } from "@/atoms/shooting";
import AttributeDetail from "@/components/AttributeDetail";
import AttributeForest from "@/components/AttributeForest";
import type { Graph } from "@/lib/graph";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue, type WritableAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

// TODO: Put this something else, maybe in an atom?
const forestByName = new Map<
  MainAttributeName,
  WritableAtom<Graph, [nodeId: string], void>[]
>([
  ["pace", paceForestAtom],
  ["shooting", shootingForestAtom],
]);

export default function AttributeEditor() {
  const t = useTranslations("AttributeEditor");
  const t2 = useTranslations("Attributes");
  const [activeForestKey, setActiveForestKey] = useState(
    forestByName.keys().next().value!,
  );
  const categoryAttributes = useAtomValue(categoryAttributesAtom);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mb-4 text-center text-3xl font-bold uppercase">
        {t("attributes")}
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
            {t2(`${name}.long`)}
          </button>
        ))}
      </div>
      <AttributeForest forest={forestByName.get(activeForestKey)!} />
      <AttributeDetail attributes={categoryAttributes.get(activeForestKey)!} />
    </div>
  );
}
