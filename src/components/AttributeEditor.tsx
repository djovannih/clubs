"use client";

import { playerAtom } from "@/atoms/player";
import AttributeForest from "@/components/AttributeForest";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AttributeEditor() {
  const t = useTranslations("Attributes");
  const player = useAtomValue(playerAtom);
  const forestNames = [...player.forests.keys()];
  const [activeForestName, setActiveForestName] = useState(forestNames.at(0)!);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between overflow-hidden rounded-lg">
        {forestNames.map((name) => (
          <button
            key={name}
            onClick={() => setActiveForestName(name)}
            className={clsx(
              "grow basis-1/3 border border-slate-800 p-2 lg:basis-0",
              name === activeForestName ? "bg-sky-700" : "bg-slate-900",
            )}
          >
            {t(`${name}.long`)}
          </button>
        ))}
      </div>
      <AttributeForest
        key={activeForestName}
        forest={player.forests.get(activeForestName)!}
        forestName={activeForestName}
      />
    </div>
  );
}
