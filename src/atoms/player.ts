import {
  type AttributeName,
  getAccelerationRate,
  getCategoryAttributes,
  getMainAttributes,
  type Player,
  type PlayerAttribute,
} from "@/lib/player";
import { atom } from "jotai";

export const playerAtom = atom<Player>({
  level: 99,
  availableSkillPoints: 160,
  position: "CAM",
  height: 180,
  weight: 80,
  weakFoot: 2,
  skillMoves: 3,
  attributes: new Map<AttributeName, PlayerAttribute>([
    ["acceleration", { value: 70, maxValue: 99 }],
    ["sprintSpeed", { value: 70, maxValue: 99 }],
    ["positioning", { value: 70, maxValue: 99 }],
    ["finishing", { value: 70, maxValue: 99 }],
    ["shotPower", { value: 70, maxValue: 99 }],
    ["longShots", { value: 70, maxValue: 99 }],
    ["volleys", { value: 70, maxValue: 99 }],
    ["penalties", { value: 70, maxValue: 99 }],
    ["vision", { value: 70, maxValue: 99 }],
    ["crossing", { value: 70, maxValue: 99 }],
    ["freeKickAccuracy", { value: 70, maxValue: 99 }],
    ["shortPassing", { value: 70, maxValue: 99 }],
    ["longPassing", { value: 70, maxValue: 99 }],
    ["curve", { value: 70, maxValue: 99 }],
    ["ballControl", { value: 70, maxValue: 99 }],
    ["dribbling", { value: 70, maxValue: 99 }],
    ["agility", { value: 70, maxValue: 99 }],
    ["reactions", { value: 70, maxValue: 99 }],
    ["balance", { value: 70, maxValue: 99 }],
    ["composure", { value: 70, maxValue: 99 }],
    ["interceptions", { value: 70, maxValue: 99 }],
    ["defensiveAwareness", { value: 70, maxValue: 99 }],
    ["headingAccuracy", { value: 70, maxValue: 99 }],
    ["slidingTackle", { value: 70, maxValue: 99 }],
    ["standingTackle", { value: 70, maxValue: 99 }],
    ["aggression", { value: 70, maxValue: 99 }],
    ["jumping", { value: 70, maxValue: 99 }],
    ["stamina", { value: 70, maxValue: 99 }],
    ["strength", { value: 70, maxValue: 99 }],
    ["gkDiving", { value: 70, maxValue: 99 }],
    ["gkHandling", { value: 70, maxValue: 99 }],
    ["gkKicking", { value: 70, maxValue: 99 }],
    ["gkPositioning", { value: 70, maxValue: 99 }],
    ["gkReflexes", { value: 70, maxValue: 99 }],
  ]),
});

export const accelerationRateAtom = atom((get) =>
  getAccelerationRate(get(playerAtom)),
);

export const mainAttributesAtom = atom((get) =>
  getMainAttributes(get(playerAtom).attributes),
);

export const categoryAttributesAtom = atom((get) =>
  getCategoryAttributes(get(playerAtom).attributes),
);
