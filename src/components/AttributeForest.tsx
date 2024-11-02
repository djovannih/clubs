import {
  deactivateAllNodesAtom,
  type Forest,
  playerAttributesByCategoryAtom,
} from "@/atoms/player";
import AttributeDetail from "@/components/AttributeDetail";
import AttributeTree from "@/components/AttributeTree";
import type { AttributeCategoryName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface AttributeForestProps {
  forest: Forest;
  forestName: AttributeCategoryName;
}

export default function AttributeForest({
  forest,
  forestName,
}: AttributeForestProps) {
  const t = useTranslations("Attributes");
  const categoryAttributes = useAtomValue(playerAttributesByCategoryAtom);
  const deactivateAllNodes = useSetAtom(deactivateAllNodesAtom);
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex overflow-hidden rounded-lg bg-slate-900">
        {forest.map((tree, i) => (
          <button
            key={`${forestName}-${i}`}
            onClick={() => setActiveTreeIndex(i)}
            className={clsx(
              "rounded-x-lg grow p-2",
              activeTreeIndex === i ? "bg-sky-700" : "bg-slate-900",
            )}
          >{`${t(`${forestName}.short`)}${forest.length <= 1 ? "" : ` ${i + 1}`}`}</button>
        ))}
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <AttributeTree key={forestName} tree={forest.at(activeTreeIndex)!} />
        <AttributeDetail attributes={categoryAttributes.get(forestName)!} />
      </div>
      <button
        className="mx-auto w-fit rounded-lg bg-red-900 p-4"
        onClick={deactivateAllNodes}
      >
        {t("resetAttributes")}
      </button>
    </div>
  );
}
