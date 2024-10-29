import { forestsAtom, toggleNodeAtom } from "@/atoms/forest";
import { playerAtom } from "@/atoms/player";
import { reapplyActivatedNodes, resetAttributeTrees } from "@/atoms/utils";
import CollapsibleCard from "@/components/CollapsibleCard";
import {
  updatePlayerHeight,
  updatePlayerPosition,
  updatePlayerWeight,
  type Position,
} from "@/lib/player";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTranslations } from "next-intl";
import Slider from "./Slider";

export default function PlayerEditor() {
  const t = useTranslations("PlayerInfo");
  const [player, setPlayer] = useAtom(playerAtom);
  const forests = useAtomValue(forestsAtom);
  const toggleNode = useSetAtom(toggleNodeAtom);

  const positions: Position[] = [
    "GK",
    "CB",
    "LB",
    "RB",
    "LWB",
    "RWB",
    "CDM",
    "CM",
    "CAM",
    "LM",
    "RM",
    "LW",
    "RW",
    "CF",
    "LF",
    "RF",
    "ST",
  ];

  return (
    <>
      <CollapsibleCard heading={t("editPlayerInfo")} maxHeight={400}>
        <div className="flex flex-col gap-4">
          <Slider
            headline={t("height")}
            value={player.height}
            minValue={160}
            maxValue={195}
            markedValues={[163, 168, 173, 178, 183, 188, 193]}
            updateValue={(value) =>
              setPlayer(updatePlayerHeight(player, value))
            }
            suffix="cm"
          />
          <Slider
            headline={t("weight")}
            value={player.weight}
            minValue={45}
            maxValue={115}
            markedValues={[55, 69, 80, 91]}
            updateValue={(value) =>
              setPlayer(updatePlayerWeight(player, value))
            }
            suffix="kg"
          />
          <div className="flex flex-col gap-2">
            <label className="block">{t("position")}</label>
            <select
              value={player.position}
              onChange={(e) => {
                const funcs = reapplyActivatedNodes(forests, toggleNode);
                resetAttributeTrees(forests, toggleNode);
                setPlayer(
                  updatePlayerPosition(player, e.target.value as Position),
                );
                funcs.forEach((func) => func());
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
    </>
  );
}
