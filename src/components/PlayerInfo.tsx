"use client";

import { playerAtom } from "@/atoms/player";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import AttributeDetail from "./AttributeDetail";
import CollapsibleCard from "./CollapsibleCard";
import StarRating from "./StarRating";
import PlayerEditor from "./PlayerEditor";

export default function PlayerInfo() {
  const t = useTranslations("PlayerInfo");
  const player = useAtomValue(playerAtom);
  const weakFoot = useAtomValue(player.weakFoot);
  const skillMoves = useAtomValue(player.skillMoves);
  const accelerationRate = useAtomValue(player.accelerationRate);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <CollapsibleCard heading={t("playerInfo")} maxHeight={250}>
          <div>
            <span className="font-bold">{`${t("position")}: `}</span>
            <span>{`${t(player.position)}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("skillPoints")}: `}</span>
            <span>{`${player.availableSkillPoints}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("height")}: `}</span>
            <span>{`${player.height} cm`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("weight")}: `}</span>
            <span>{`${player.weight} kg`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("accelerate")}: `}</span>
            <span>{`${t(accelerationRate)}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("weakFoot")}: `}</span>
            <StarRating starsCount={weakFoot} maxStarsCount={5} />
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("skillMoves")}: `}</span>
            <StarRating starsCount={skillMoves} maxStarsCount={5} />
          </div>
        </CollapsibleCard>
        <AttributeDetail attributes={mainAttributes} />
        <PlayerEditor />
      </div>
    </>
  );
}
