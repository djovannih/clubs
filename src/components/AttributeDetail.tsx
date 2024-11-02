import type { PlayerAttributeWithName } from "@/atoms/player";
import CollapsibleCard from "@/components/CollapsibleCard";
import ProgressBar from "@/components/ProgressBar";
import { useTranslations } from "next-intl";

interface AttributeDetailprops {
  attributes: PlayerAttributeWithName[];
}

export default function AttributeDetail({ attributes }: AttributeDetailprops) {
  const t = useTranslations("Attributes");

  return (
    <div className="lg:h-fit lg:basis-1/3">
      <CollapsibleCard heading={t("attributes")} maxHeight={400}>
        <div className="flex flex-col gap-4">
          {attributes.map((attribute) => (
            <ProgressBar
              key={attribute.name}
              value={attribute.value}
              maxValue={attribute.maxValue}
              label={t(`${attribute.name}.long`)}
            />
          ))}
        </div>
      </CollapsibleCard>
    </div>
  );
}
