"use client";

import {
  accelerationRateAtom as playerAccelerationRateAtom,
  playerAtom,
  mainAttributesAtom,
} from "@/atoms/player";
import { useAtomValue } from "jotai";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import AttributeDetail from "./AttributeDetail";

export default function PlayerInfo() {
  const t = useTranslations("PlayerInfo");
  const player = useAtomValue(playerAtom);
  const mainAttributes = useAtomValue(mainAttributesAtom);
  const accelerationRate = useAtomValue(playerAccelerationRateAtom);

  return (
    <>
      <h2 className="mt-16 text-center text-3xl font-bold uppercase">
        {t("playerInfo")}
      </h2>
      <div className="mb-8 flex flex-col gap-4 p-4">
        <div className="rounded-lg bg-node-locked p-4">
          <div>{`${t("position")}: ${player.position}`}</div>
          <div>{`${t("height")}: ${player.height}`}</div>
          <div>{`${t("weight")}: ${player.weight}`}</div>
          <div>{`${t("accelerate")}: ${accelerationRate}`}</div>
          <div className="flex gap-2">
            <span>{`${t("weakFoot")}: `}</span>
            <div className="flex">
              {/* TODO: extract a StarRating component */}
              {Array.from({ length: player.weakFoot }, (_, i) => (
                <Star key={i} size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <span>{`${t("skillMoves")}: `}</span>
            <div className="flex">
              {/* TODO: use the StarRating component */}
              {Array.from({ length: player.skillMoves }, (_, i) => (
                <Star key={i} size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
        <AttributeDetail attributes={mainAttributes} />
      </div>
    </>
  );
}
