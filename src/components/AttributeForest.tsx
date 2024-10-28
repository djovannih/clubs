import { forestsAtom, getDefaultForest, toggleNodeAtom } from "@/atoms/forest";
import {
  categoryAttributesAtom,
  getDefaultPlayer,
  playerAtom,
} from "@/atoms/player";
import AttributeTree from "@/components/AttributeTree";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AttributeDetail from "./AttributeDetail";
import { toggleNode } from "@/lib/graph";

interface AttributeForestProps {
  forestName: MainAttributeName;
}

export default function AttributeForest({ forestName }: AttributeForestProps) {
  const t = useTranslations("Attributes");
  const [forests, setForests] = useAtom(forestsAtom);
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);
  const categoryAttributes = useAtomValue(categoryAttributesAtom);
  const [player, setPlayer] = useAtom(playerAtom);
  const forest = forests.get(forestName)!;
  const toggleNode = useSetAtom(toggleNodeAtom);

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-slate-900 flex overflow-hidden rounded-lg">
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
        className="bg-red-900 mx-auto w-fit rounded-lg p-4"
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
