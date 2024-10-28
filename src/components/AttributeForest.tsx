import { forestsAtom, toggleNodeAtom } from "@/atoms/forest";
import { categoryAttributesAtom } from "@/atoms/player";
import AttributeTree from "@/components/AttributeTree";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AttributeDetail from "./AttributeDetail";

interface AttributeForestProps {
  forestName: MainAttributeName;
}

export default function AttributeForest({ forestName }: AttributeForestProps) {
  const t = useTranslations("Attributes");
  const forests = useAtomValue(forestsAtom);
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);
  const categoryAttributes = useAtomValue(categoryAttributesAtom);
  const toggleNode = useSetAtom(toggleNodeAtom);
  const forest = forests.get(forestName)!;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex overflow-hidden rounded-lg bg-slate-900">
        {forest.map((_, i) => (
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
      <AttributeTree
        key={forestName}
        forestName={forestName}
        treeIndex={activeTreeIndex}
      />
      <AttributeDetail attributes={categoryAttributes.get(forestName)!} />
      <button
        className="mx-auto w-fit rounded-lg bg-red-900 p-4"
        onClick={() => {
          forests.forEach((forest) =>
            forest.forEach((tree) =>
              tree.forEach((node) => {
                if (node.isActive)
                  toggleNode(forestName, activeTreeIndex, node.id);
              }),
            ),
          );
        }}
      >
        {t("resetAttributes")}
      </button>
    </div>
  );
}
