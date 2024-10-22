import { AttributeCategory, Player, PlayerAttribute } from "@/lib/player";
import { atom } from "jotai";

export const playerAtom = atom<Player>({
  position: "CAM",
  height: 180,
  weight: 80,
  accelerationRate: "Controlled Explosive",
  weakFoot: 3,
  skillMoves: 4,
  attributes: new Map<AttributeCategory, Map<string, PlayerAttribute>>([
    [
      "pace",
      new Map<string, PlayerAttribute>([
        ["acceleration", { value: 70, maxValue: 99 }],
        ["sprintSpeed", { value: 70, maxValue: 99 }],
      ]),
    ],
    [
      "shooting",
      new Map<string, PlayerAttribute>([
        ["positioning", { value: 70, maxValue: 99 }],
        ["finishing", { value: 70, maxValue: 99 }],
        ["shotPower", { value: 70, maxValue: 99 }],
        ["longShots", { value: 70, maxValue: 99 }],
        ["volleys", { value: 70, maxValue: 99 }],
        ["penalties", { value: 70, maxValue: 99 }],
      ]),
    ],
    [
      "passing",
      new Map<string, PlayerAttribute>([
        ["vision", { value: 70, maxValue: 99 }],
        ["crossing", { value: 70, maxValue: 99 }],
        ["freeKickAccuracy", { value: 70, maxValue: 99 }],
        ["shortPassing", { value: 70, maxValue: 99 }],
        ["longPassing", { value: 70, maxValue: 99 }],
        ["curve", { value: 70, maxValue: 99 }],
      ]),
    ],
    [
      "dribbling",
      new Map<string, PlayerAttribute>([
        ["ballControl", { value: 70, maxValue: 99 }],
        ["dribbling", { value: 70, maxValue: 99 }],
        ["agility", { value: 70, maxValue: 99 }],
        ["reactions", { value: 70, maxValue: 99 }],
        ["balance", { value: 70, maxValue: 99 }],
        ["composure", { value: 70, maxValue: 99 }],
      ]),
    ],
    [
      "defending",
      new Map<string, PlayerAttribute>([
        ["interceptions", { value: 70, maxValue: 99 }],
        ["defAwareness", { value: 70, maxValue: 99 }],
        ["headingAccuracy", { value: 70, maxValue: 99 }],
        ["slidingTackle", { value: 70, maxValue: 99 }],
        ["standingTackle", { value: 70, maxValue: 99 }],
      ]),
    ],
    [
      "physicality",
      new Map<string, PlayerAttribute>([
        ["aggression", { value: 70, maxValue: 99 }],
        ["jumping", { value: 70, maxValue: 99 }],
        ["stamina", { value: 70, maxValue: 99 }],
        ["strength", { value: 70, maxValue: 99 }],
      ]),
    ],
  ]),
});

const getCategoryValue = (attributes: PlayerAttribute[]) =>
  Math.round(
    attributes.reduce((acc, attr) => acc + attr.value, 0) / attributes.length,
  );

export const playerAttributesValues = atom(
  (get) =>
    new Map(
      get(playerAtom)
        .attributes.entries()
        .map(([attributeCategory, attributes]) => [
          attributeCategory,
          getCategoryValue(Array.from(attributes.values())),
        ]),
    ),
);
