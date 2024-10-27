"use client";

import { playerAtom } from "@/atoms/player";
import { updatePlayerHeight, type Position } from "@/lib/player";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

export default function PlayerEditor() {
  const t = useTranslations("PlayerInfo");
  const [player, setPlayer] = useAtom(playerAtom);

  const positions: Position[] = [
    "GK",
    "CB",
    "LB",
    "RB",
    "CDM",
    "CM",
    "CAM",
    "LM",
    "RM",
    "LW",
    "RW",
    "ST",
  ];

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-lg p-6 shadow-md">
      <div>
        <label className="mb-2 block text-sm font-bold">{t("height")}</label>
        <input
          type="number"
          value={player.height}
          onChange={(e) => {
            const newLocal = updatePlayerHeight(
              player,
              parseInt(e.target.value),
            );
            setPlayer(newLocal);
          }}
          className="w-full rounded-md border bg-background px-3 py-2"
          min={0}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">{t("weight")}</label>
        <input
          type="number"
          value={player.weight}
          onChange={(e) =>
            setPlayer({ ...player, weight: parseInt(e.target.value) })
          }
          className="w-full rounded-md border bg-background px-3 py-2"
          min={0}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold">{t("position")}</label>
        <select
          value={player.position}
          onChange={(e) =>
            setPlayer({ ...player, position: e.target.value as Position })
          }
          className="w-full rounded-md border bg-background px-3 py-2"
        >
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
