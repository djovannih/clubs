import type {
  AttributeName,
  MainAttributeName,
  PlayerAttribute,
} from "@/lib/player";
import { useTranslations } from "next-intl";
import CollapsibleCard from "./CollapsibleCard";

interface AttributeDetailprops {
  attributes: Map<MainAttributeName | AttributeName, PlayerAttribute>;
}
export default function AttributeDetail({ attributes }: AttributeDetailprops) {
  const t = useTranslations("Attributes");

  return (
    <CollapsibleCard heading={t("attributes")} maxHeight={400}>
      <div className="flex flex-col gap-4">
        {Array.from(attributes.entries()).map(([name, attribute]) => (
          <div key={name} className="flex flex-col gap-1">
            <div className="flex justify-between">
              <span>{t(`${name}.long`)}</span>
              <span>{attribute.value}</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-950">
              <div
                className="h-2.5 rounded-full bg-sky-700"
                style={{
                  width: `${(attribute.value / attribute.maxValue) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </CollapsibleCard>
  );
}
