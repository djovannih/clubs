import { playerAtom } from "@/atoms/player";
import { AttributeCategory } from "@/lib/player";
import { useAtomValue } from "jotai";

interface AttributeDetailprops {
  category: AttributeCategory;
}
export default function AttributeDetail({ category }: AttributeDetailprops) {
  const player = useAtomValue(playerAtom);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-node-locked p-4">
      {Array.from(player.attributes.get(category)!.entries()).map(
        ([name, attribute]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between">
              <span>{name}</span>
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
        ),
      )}
    </div>
  );
}
