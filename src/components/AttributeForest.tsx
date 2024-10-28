import { forestsAtom } from "@/atoms/forest";
import { categoryAttributesAtom } from "@/atoms/player";
import AttributeTree from "@/components/AttributeTree";
import type { MainAttributeName } from "@/lib/player";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AttributeDetail from "./AttributeDetail";

interface AttributeForestProps {
  forestName: MainAttributeName;
}

export default function AttributeForest({ forestName }: AttributeForestProps) {
  const t = useTranslations("Attributes");
  const forest = useAtomValue(forestsAtom).get(forestName)!;
  const [activeTreeIndex, setActiveTreeIndex] = useState(0);
  const categoryAttributes = useAtomValue(categoryAttributesAtom);

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-slate-900 flex rounded-lg overflow-hidden">
        {forest.map((_, i) => (
          <button
            key={`${forestName}-${i}`}
            onClick={() => setActiveTreeIndex(i)}
            className={clsx(
              "grow rounded-x-lg p-2",
              activeTreeIndex === i ? "bg-sky-700" : "bg-slate-900",
            )}
          >{`${t(`${forestName}.short`)}${forest.length <= 1 ? "" : ` ${i + 1}`}`}</button>
        ))}
      </div>
      <AttributeTree forestName={forestName} treeIndex={activeTreeIndex} />
      <AttributeDetail attributes={categoryAttributes.get(forestName)!} />
    </div>
  );
}
