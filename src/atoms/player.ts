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
  level: 100,
  availableSkillPoints: 160,
  position: "ST",
  height: 160,
  weight: 45,
  weakFoot: 2,
  skillMoves: 3,
  attributes: new Map<AttributeName, PlayerAttribute>([
    ["acceleration", { value: 86, maxValue: 99 }],
    ["sprintSpeed", { value: 77, maxValue: 99 }],
    ["positioning", { value: 85, maxValue: 99 }],
    ["finishing", { value: 82, maxValue: 99 }],
    ["shotPower", { value: 77, maxValue: 99 }],
    ["longShots", { value: 78, maxValue: 99 }],
    ["volleys", { value: 79, maxValue: 99 }],
    ["penalties", { value: 83, maxValue: 99 }],
    ["vision", { value: 75, maxValue: 99 }],
    ["crossing", { value: 71, maxValue: 99 }],
    ["freeKickAccuracy", { value: 78, maxValue: 99 }],
    ["shortPassing", { value: 84, maxValue: 99 }],
    ["longPassing", { value: 66, maxValue: 99 }],
    ["curve", { value: 78, maxValue: 99 }],
    ["ballControl", { value: 80, maxValue: 99 }],
    ["dribbling", { value: 81, maxValue: 99 }],
    ["agility", { value: 78, maxValue: 99 }],
    ["reactions", { value: 90, maxValue: 99 }],
    ["balance", { value: 80, maxValue: 99 }],
    ["composure", { value: 88, maxValue: 99 }],
    ["interceptions", { value: 60, maxValue: 99 }],
    ["defensiveAwareness", { value: 50, maxValue: 99 }],
    ["headingAccuracy", { value: 72, maxValue: 99 }],
    ["slidingTackle", { value: 52, maxValue: 99 }],
    ["standingTackle", { value: 59, maxValue: 99 }],
    ["aggression", { value: 66, maxValue: 99 }],
    ["jumping", { value: 70, maxValue: 99 }],
    ["stamina", { value: 77, maxValue: 99 }],
    ["strength", { value: 73, maxValue: 99 }],
    ["gkDiving", { value: 10, maxValue: 99 }],
    ["gkHandling", { value: 10, maxValue: 99 }],
    ["gkKicking", { value: 10, maxValue: 99 }],
    ["gkPositioning", { value: 10, maxValue: 99 }],
    ["gkReflexes", { value: 10, maxValue: 99 }],
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
