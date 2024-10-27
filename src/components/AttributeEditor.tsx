"use client";

import { forestsAtom } from "@/atoms/forest";
import { categoryAttributesAtom } from "@/atoms/player";
import AttributeDetail from "@/components/AttributeDetail";
import AttributeForest from "@/components/AttributeForest";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AttributeEditor() {
  const forests = useAtomValue(forestsAtom);
  const t = useTranslations("AttributeEditor");
  const t2 = useTranslations("Attributes");
  const [activeForestName, setActiveForestKey] = useState(
    forests.keys().next().value!,
  );
  const categoryAttributes = useAtomValue(categoryAttributesAtom);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mb-4 text-center text-3xl font-bold uppercase">
        {t("attributes")}
      </h2>
      {/* TODO: extract a component */}
      <div className="grid grid-cols-3 justify-between bg-background">
        {Array.from(forests.keys()).map((name) => (
          <button
            key={name}
            onClick={() => setActiveForestKey(name)}
            className={clsx(
              "p-2",
              name === activeForestName
                ? "bg-highlight-dark"
                : "bg-node-locked",
            )}
          >
            {t2(`${name}.long`)}
          </button>
        ))}
      </div>
      <AttributeDetail attributes={categoryAttributes.get(activeForestName)!} />
      <AttributeForest forestName={activeForestName} />
    </div>
  );
}
