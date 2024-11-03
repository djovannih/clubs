import { playerAtom, type Position, positions } from "@/atoms/player";
import CollapsibleCard from "@/components/CollapsibleCard";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Slider from "./Slider";

export default function PlayerEditor() {
  const t = useTranslations("PlayerInfo");
  const player = useAtomValue(playerAtom);
  const [playerLevel, setPlayerLevel] = useAtom(player.level);
  const [playerHeight, setPlayerHeight] = useAtom(player.height);
  const [playerWeight, setPlayerWeight] = useAtom(player.weight);
  const [playerPosition, setPlayerPosition] = useAtom(player.position);

  return (
    <CollapsibleCard heading={t("editPlayerInfo")} maxHeight={400}>
      <div className="flex flex-col gap-4">
        <Slider
          headline={t("level")}
          value={playerLevel}
          minValue={1}
          maxValue={100}
          markedValues={[1, 50, 100]}
          updateValue={(value) => setPlayerLevel(value)}
        />
        <Slider
          headline={t("height")}
          value={playerHeight}
          minValue={160}
          maxValue={195}
          markedValues={[163, 168, 173, 178, 183, 188, 193]}
          updateValue={(value) => setPlayerHeight(value)}
          suffix="cm"
        />
        <Slider
          headline={t("weight")}
          value={playerWeight}
          minValue={45}
          maxValue={115}
          markedValues={[55, 69, 80, 91]}
          updateValue={(value) => setPlayerWeight(value)}
          suffix="kg"
        />
        <div className="flex flex-col gap-2">
          <label className="block">{t("position")}</label>
          <select
            value={playerPosition}
            onChange={(e) => {
              setPlayerPosition(e.target.value as Position);
            }}
            className="w-full rounded-md border border-slate-500 bg-slate-900 px-3 py-2 focus:outline-none"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {t(pos)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </CollapsibleCard>
  );
}
