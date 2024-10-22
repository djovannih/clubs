"use client";

import { playerAtom, playerAttributesValues } from "@/atoms/player";
import { useAtomValue } from "jotai";
import { Star } from "lucide-react";

export default function PlayerInfo() {
  const player = useAtomValue(playerAtom);
  const playerAttributes = useAtomValue(playerAttributesValues);

  return (
    <>
      <h2 className="mt-16 text-center text-3xl font-bold uppercase">
        Player info
      </h2>
      <div className="mb-8 flex flex-col gap-4 p-4">
        <div className="rounded-lg bg-node-locked p-4">
          <div>Position: {player.position}</div>
          <div>Height: {player.height}</div>
          <div>Weight: {player.weight}</div>
          <div>AcceleRATE: {player.accelerationRate}</div>
          <div className="flex gap-2">
            <span>Weak foot:</span>
            <div className="flex">
              {Array.from({ length: player.weakFoot }, (_, i) => (
                <Star key={i} size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <span>Skill moves:</span>
            <div className="flex">
              {Array.from({ length: player.skillMoves }, (_, i) => (
                <Star key={i} size={24} fill="yellow" strokeWidth={0} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-lg bg-node-locked p-4">
          {Array.from(player.attributes.keys()).map((attributeCategory) => (
            <div key={attributeCategory}>
              <div className="mb-1 flex justify-between">
                <span>{attributeCategory}</span>
                <span>{playerAttributes.get(attributeCategory)}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-node-locked">
                <div
                  className="h-2.5 rounded-full bg-highlight-dark"
                  style={{
                    width: `${(playerAttributes.get(attributeCategory)! / 99) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
