"use client";

import { playerAtom, playerCategoryAttributesAtom } from "@/atoms/player";
import AttributeDetail from "@/components/AttributeDetail";
import CollapsibleCard from "@/components/CollapsibleCard";
import PlayerEditor from "@/components/PlayerEditor";
import StarRating from "@/components/StarRating";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";

export default function PlayerInfo() {
  const t = useTranslations("PlayerInfo");
  const player = useAtomValue(playerAtom);
  const playerLevel = useAtomValue(player.level);
  const playerPosition = useAtomValue(player.position);
  const weakFoot = useAtomValue(player.weakFoot);
  const skillMoves = useAtomValue(player.skillMoves);
  const accelerationRate = useAtomValue(player.accelerationRate);
  const playerMainAttributes = useAtomValue(playerCategoryAttributesAtom);
  const availableSkillPoints = useAtomValue(player.availableSkillPoints);
  const playerHeight = useAtomValue(player.height);
  const playerWeight = useAtomValue(player.weight);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <CollapsibleCard heading={t("playerInfo")} maxHeight={280}>
          <div>
            <span className="font-bold">{`${t("level")}: `}</span>
            <span>{playerLevel}</span>
          </div>
          <div>
            <span className="font-bold">{`${t("position")}: `}</span>
            <span>{`${t(playerPosition)}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("skillPoints")}: `}</span>
            <span>{`${availableSkillPoints}`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("height")}: `}</span>
            <span>{`${playerHeight} cm`}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-bold">{`${t("weight")}: `}</span>
            <span>{`${playerWeight} kg`}</span>
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
        <AttributeDetail attributes={playerMainAttributes} />
        <PlayerEditor />
      </div>
    </>
  );
}
