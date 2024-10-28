"use client";

import { forestsAtom } from "@/atoms/forest";
import AttributeForest from "@/components/AttributeForest";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AttributeEditor() {
  const forests = useAtomValue(forestsAtom);
  const t = useTranslations("Attributes");
  const [activeForestName, setActiveForestName] = useState(
    forests.keys().next().value!,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between overflow-hidden rounded-lg">
        {Array.from(forests.keys()).map((name) => (
          <button
            key={name}
            onClick={() => setActiveForestName(name)}
            className={clsx(
              "grow basis-1/3 border border-slate-800 p-2",
              name === activeForestName ? "bg-sky-700" : "bg-slate-900",
            )}
          >
            {t(`${name}.long`)}
          </button>
        ))}
      </div>
      <AttributeForest key={activeForestName} forestName={activeForestName} />
    </div>
  );
}
