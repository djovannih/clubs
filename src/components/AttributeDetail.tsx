import type {
  AttributeName,
  MainAttributeName,
  PlayerAttribute,
} from "@/lib/player";
import { useTranslations } from "next-intl";

interface AttributeDetailprops {
  attributes: Map<MainAttributeName | AttributeName, PlayerAttribute>;
}
export default function AttributeDetail({ attributes }: AttributeDetailprops) {
  const t = useTranslations("Attributes");

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-node-locked p-4">
      {Array.from(attributes.entries()).map(([name, attribute]) => (
        <div key={name}>
          <div className="mb-1 flex justify-between">
            <span>{t(`${name}.long`)}</span>
            <span>{attribute.value}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-node-locked">
            <div
              className="h-2.5 rounded-full bg-highlight-dark"
              style={{
                width: `${(attribute.value / attribute.maxValue) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
