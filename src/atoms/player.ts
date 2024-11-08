import { jsonStorageOptions } from "@/atoms/utils";
import { defendingTrees } from "@/forests/defending";
import { dribblingTrees } from "@/forests/dribbling";
import { goalkeepingTrees } from "@/forests/goalkeeping";
import { paceTrees } from "@/forests/pace";
import { passingTrees } from "@/forests/passing";
import { physicalityTrees } from "@/forests/physicality";
import { shootingTrees } from "@/forests/shooting";
import type { Graph, GraphNode } from "@/lib/graph";
import { average, sum } from "@/lib/math";
import type { Getter, PrimitiveAtom, Setter } from "jotai";
import { type Atom, atom, type WritableAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const getActiveNodes = (forests: Map<AttributeCategoryName, Forest>) =>
  [...forests.values()].flatMap((forest) =>
    [...forest.values()].flatMap((tree) =>
      [...tree.values()].filter((node) => node.isActive),
    ),
  );

const getHeightModifiers = (height: number): Map<AttributeName, number> => {
  //  height >= 160 && height <= 162
  if (height <= 162) return new Map();

  if (height >= 163 && height <= 167)
    return new Map([
      ["acceleration", -1],
      ["acceleration", -1],
      ["longPassing", 1],
      ["balance", -1],
      ["defAwareness", 1],
      ["standingTackle", -1],
      ["slidingTackle", -1],
      ["jumping", 1],
      ["stamina", 1],
      ["strength", 1],
      ["aggression", 1],
    ]);

  if (height >= 168 && height <= 172)
    return new Map([
      ["acceleration", -2],
      ["sprintSpeed", 1],
      ["headingAccuracy", 1],
      ["shotPower", 1],
      ["vision", 1],
      ["longPassing", 2],
      ["shortPassing", -1],
      ["curve", -1],
      ["agility", -1],
      ["balance", -2],
      ["ballControl", -1],
      ["dribbling", -1],
      ["defAwareness", -2],
      ["standingTackle", -2],
      ["slidingTackle", -2],
      ["jumping", 2],
      ["stamina", 2],
      ["strength", 2],
      ["aggression", 2],
    ]);

  if (height >= 173 && height <= 177)
    return new Map([
      ["acceleration", -3],
      ["sprintSpeed", 1],
      ["finishing", 1],
      ["headingAccuracy", 2],
      ["shotPower", 1],
      ["volleys", 1],
      ["vision", 1],
      ["longPassing", 3],
      ["shortPassing", -1],
      ["curve", -1],
      ["agility", -1],
      ["balance", -3],
      ["ballControl", -1],
      ["dribbling", -2],
      ["defAwareness", -3],
      ["standingTackle", -3],
      ["slidingTackle", -3],
      ["jumping", 3],
      ["stamina", 3],
      ["strength", 3],
      ["aggression", 3],
    ]);

  if (height >= 178 && height <= 182)
    return new Map([
      ["acceleration", -4],
      ["sprintSpeed", 2],
      ["finishing", 1],
      ["headingAccuracy", 3],
      ["shotPower", 2],
      ["longShots", 1],
      ["volleys", 1],
      ["vision", 2],
      ["longPassing", 4],
      ["shortPassing", -2],
      ["curve", -2],
      ["agility", -2],
      ["balance", -4],
      ["ballControl", -2],
      ["dribbling", -3],
      ["defAwareness", -4],
      ["standingTackle", -4],
      ["slidingTackle", -4],
      ["jumping", 4],
      ["stamina", 4],
      ["strength", 4],
      ["aggression", 4],
      ["composure", 1],
    ]);

  if (height >= 183 && height <= 187)
    return new Map([
      ["acceleration", -6],
      ["sprintSpeed", 1],
      ["finishing", 2],
      ["headingAccuracy", 4],
      ["shotPower", 2],
      ["longShots", 1],
      ["volleys", 1],
      ["vision", 2],
      ["longPassing", 5],
      ["shortPassing", -2],
      ["curve", -2],
      ["agility", -3],
      ["balance", -5],
      ["ballControl", -2],
      ["dribbling", -4],
      ["defAwareness", -5],
      ["standingTackle", -5],
      ["slidingTackle", -5],
      ["jumping", 5],
      ["stamina", 3],
      ["strength", 5],
      ["reactions", -1],
      ["aggression", 6],
      ["composure", 1],
    ]);

  if (height >= 188 && height <= 192)
    return new Map([
      ["acceleration", -10],
      ["sprintSpeed", -3],
      ["finishing", 2],
      ["headingAccuracy", 5],
      ["shotPower", 3],
      ["longShots", 1],
      ["volleys", 2],
      ["vision", 3],
      ["crossing", 2],
      ["longPassing", 6],
      ["shortPassing", -3],
      ["curve", -3],
      ["agility", -5],
      ["balance", -6],
      ["ballControl", -3],
      ["dribbling", -6],
      ["defAwareness", -6],
      ["standingTackle", -6],
      ["slidingTackle", -6],
      ["jumping", 3],
      ["stamina", 1],
      ["strength", 6],
      ["reactions", -2],
      ["aggression", 8],
      ["composure", 1],
    ]);

  // height >= 193 && height <= 195
  return new Map([
    ["acceleration", -14],
    ["sprintSpeed", -7],
    ["finishing", 1],
    ["headingAccuracy", 6],
    ["shotPower", 3],
    ["longShots", 1],
    ["volleys", 2],
    ["vision", 3],
    ["crossing", 2],
    ["longPassing", 7],
    ["shortPassing", -4],
    ["curve", -3],
    ["agility", -9],
    ["balance", -7],
    ["ballControl", -4],
    ["dribbling", -9],
    ["defAwareness", -7],
    ["standingTackle", -7],
    ["slidingTackle", -7],
    ["stamina", -3],
    ["strength", 7],
    ["reactions", -4],
    ["aggression", 10],
    ["composure", 2],
  ]);
};

const getWeightModifiers = (weight: number): Map<AttributeName, number> => {
  // weight >= 45 && weight <= 54
  if (weight <= 54) return new Map();

  if (weight >= 55 && weight <= 68)
    return new Map([
      ["acceleration", -1],
      ["sprintSpeed", -1],
      ["headingAccuracy", 1],
      ["longPassing", 1],
      ["shortPassing", -1],
      ["agility", -1],
      ["jumping", 1],
      ["strength", 1],
    ]);

  if (weight >= 69 && weight <= 79)
    return new Map([
      ["acceleration", -2],
      ["sprintSpeed", -2],
      ["freeKickAccuracy", 1],
      ["headingAccuracy", 1],
      ["shotPower", 1],
      ["longShots", 1],
      ["volleys", 1],
      ["longPassing", 2],
      ["shortPassing", -2],
      ["agility", -2],
      ["balance", 1],
      ["dribbling", -1],
      ["jumping", 3],
      ["stamina", -1],
      ["strength", 2],
    ]);

  if (weight >= 80 && weight <= 90)
    return new Map([
      ["acceleration", -3],
      ["sprintSpeed", -2],
      ["finishing", 1],
      ["freeKickAccuracy", 1],
      ["headingAccuracy", 2],
      ["shotPower", 1],
      ["longShots", 1],
      ["volleys", 1],
      ["longPassing", 3],
      ["shortPassing", -2],
      ["agility", -3],
      ["balance", 1],
      ["dribbling", -1],
      ["jumping", 1],
      ["stamina", -1],
      ["strength", 3],
    ]);

  // weight >= 91 && weight <= 115
  return new Map([
    ["acceleration", -5],
    ["sprintSpeed", -2],
    ["finishing", 1],
    ["freeKickAccuracy", 2],
    ["headingAccuracy", 2],
    ["shotPower", 2],
    ["longShots", 2],
    ["volleys", 2],
    ["penalties", 1],
    ["longPassing", 4],
    ["shortPassing", -3],
    ["agility", -5],
    ["balance", 2],
    ["positioning", 1],
    ["dribbling", -2],
    ["jumping", -1],
    ["stamina", -2],
    ["strength", 4],
  ]);
};

const getNodesModifiers = (
  forests: Map<AttributeCategoryName, Forest>,
): Map<AttributeName, number> =>
  getActiveNodes(forests)
    .map((node) => node.modifiers)
    .reduce(
      (flatModifiers, modifiers) =>
        [...modifiers.entries()].reduce(
          (mergedModifiers, [attribute, modifier]) =>
            mergedModifiers.set(
              attribute,
              (mergedModifiers.get(attribute) || 0) + modifier,
            ),
          flatModifiers,
        ),
      new Map<AttributeName, number>(),
    );

export const getAttributesByPosition = (position: Position) => {
  switch (position) {
    case "GK":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 61, maxValue: 99 }],
        ["sprintSpeed", { value: 51, maxValue: 99 }],
        ["finishing", { value: 20, maxValue: 99 }],
        ["freeKickAccuracy", { value: 20, maxValue: 99 }],
        ["headingAccuracy", { value: 15, maxValue: 99 }],
        ["shotPower", { value: 55, maxValue: 99 }],
        ["longShots", { value: 15, maxValue: 99 }],
        ["volleys", { value: 15, maxValue: 99 }],
        ["penalties", { value: 35, maxValue: 99 }],
        ["vision", { value: 65, maxValue: 99 }],
        ["crossing", { value: 25, maxValue: 99 }],
        ["longPassing", { value: 60, maxValue: 99 }],
        ["shortPassing", { value: 55, maxValue: 99 }],
        ["curve", { value: 30, maxValue: 99 }],
        ["agility", { value: 58, maxValue: 99 }],
        ["balance", { value: 56, maxValue: 99 }],
        ["positioning", { value: 20, maxValue: 99 }],
        ["ballControl", { value: 20, maxValue: 99 }],
        ["dribbling", { value: 15, maxValue: 99 }],
        ["interceptions", { value: 20, maxValue: 99 }],
        ["defAwareness", { value: 20, maxValue: 99 }],
        ["standingTackle", { value: 20, maxValue: 99 }],
        ["slidingTackle", { value: 20, maxValue: 99 }],
        ["jumping", { value: 64, maxValue: 99 }],
        ["stamina", { value: 56, maxValue: 99 }],
        ["strength", { value: 43, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 40, maxValue: 99 }],
        ["composure", { value: 60, maxValue: 99 }],
        ["gkDiving", { value: 85, maxValue: 99 }],
        ["gkHandling", { value: 77, maxValue: 99 }],
        ["gkKicking", { value: 74, maxValue: 99 }],
        ["gkReflexes", { value: 85, maxValue: 99 }],
        ["gkPositioning", { value: 74, maxValue: 99 }],
      ]);
    case "CB":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 74, maxValue: 99 }],
        ["sprintSpeed", { value: 75, maxValue: 99 }],
        ["finishing", { value: 67, maxValue: 99 }],
        ["freeKickAccuracy", { value: 62, maxValue: 99 }],
        ["headingAccuracy", { value: 77, maxValue: 99 }],
        ["shotPower", { value: 61, maxValue: 99 }],
        ["longShots", { value: 61, maxValue: 99 }],
        ["volleys", { value: 56, maxValue: 99 }],
        ["penalties", { value: 65, maxValue: 99 }],
        ["vision", { value: 68, maxValue: 99 }],
        ["crossing", { value: 67, maxValue: 99 }],
        ["longPassing", { value: 74, maxValue: 99 }],
        ["shortPassing", { value: 77, maxValue: 99 }],
        ["curve", { value: 68, maxValue: 99 }],
        ["agility", { value: 73, maxValue: 99 }],
        ["balance", { value: 67, maxValue: 99 }],
        ["positioning", { value: 62, maxValue: 99 }],
        ["ballControl", { value: 73, maxValue: 99 }],
        ["dribbling", { value: 69, maxValue: 99 }],
        ["interceptions", { value: 84, maxValue: 99 }],
        ["defAwareness", { value: 82, maxValue: 99 }],
        ["standingTackle", { value: 79, maxValue: 99 }],
        ["slidingTackle", { value: 81, maxValue: 99 }],
        ["jumping", { value: 79, maxValue: 99 }],
        ["stamina", { value: 81, maxValue: 99 }],
        ["strength", { value: 79, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 82, maxValue: 99 }],
        ["composure", { value: 87, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "LB":
    case "RB":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 79, maxValue: 99 }],
        ["sprintSpeed", { value: 79, maxValue: 99 }],
        ["finishing", { value: 61, maxValue: 99 }],
        ["freeKickAccuracy", { value: 66, maxValue: 99 }],
        ["headingAccuracy", { value: 70, maxValue: 99 }],
        ["shotPower", { value: 64, maxValue: 99 }],
        ["longShots", { value: 67, maxValue: 99 }],
        ["volleys", { value: 62, maxValue: 99 }],
        ["penalties", { value: 68, maxValue: 99 }],
        ["vision", { value: 73, maxValue: 99 }],
        ["crossing", { value: 79, maxValue: 99 }],
        ["longPassing", { value: 65, maxValue: 99 }],
        ["shortPassing", { value: 75, maxValue: 99 }],
        ["curve", { value: 78, maxValue: 99 }],
        ["agility", { value: 75, maxValue: 99 }],
        ["balance", { value: 73, maxValue: 99 }],
        ["positioning", { value: 72, maxValue: 99 }],
        ["ballControl", { value: 76, maxValue: 99 }],
        ["dribbling", { value: 74, maxValue: 99 }],
        ["interceptions", { value: 82, maxValue: 99 }],
        ["defAwareness", { value: 81, maxValue: 99 }],
        ["standingTackle", { value: 75, maxValue: 99 }],
        ["slidingTackle", { value: 79, maxValue: 99 }],
        ["jumping", { value: 75, maxValue: 99 }],
        ["stamina", { value: 86, maxValue: 99 }],
        ["strength", { value: 70, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 74, maxValue: 99 }],
        ["composure", { value: 83, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "LWB":
    case "RWB":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 82, maxValue: 99 }],
        ["sprintSpeed", { value: 80, maxValue: 99 }],
        ["finishing", { value: 64, maxValue: 99 }],
        ["freeKickAccuracy", { value: 72, maxValue: 99 }],
        ["headingAccuracy", { value: 66, maxValue: 99 }],
        ["shotPower", { value: 61, maxValue: 99 }],
        ["longShots", { value: 64, maxValue: 99 }],
        ["volleys", { value: 64, maxValue: 99 }],
        ["penalties", { value: 70, maxValue: 99 }],
        ["vision", { value: 76, maxValue: 99 }],
        ["crossing", { value: 82, maxValue: 99 }],
        ["longPassing", { value: 67, maxValue: 99 }],
        ["shortPassing", { value: 73, maxValue: 99 }],
        ["curve", { value: 80, maxValue: 99 }],
        ["agility", { value: 79, maxValue: 99 }],
        ["balance", { value: 75, maxValue: 99 }],
        ["positioning", { value: 72, maxValue: 99 }],
        ["ballControl", { value: 78, maxValue: 99 }],
        ["dribbling", { value: 76, maxValue: 99 }],
        ["interceptions", { value: 78, maxValue: 99 }],
        ["defAwareness", { value: 79, maxValue: 99 }],
        ["standingTackle", { value: 73, maxValue: 99 }],
        ["slidingTackle", { value: 77, maxValue: 99 }],
        ["jumping", { value: 70, maxValue: 99 }],
        ["stamina", { value: 83, maxValue: 99 }],
        ["strength", { value: 62, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 71, maxValue: 99 }],
        ["composure", { value: 81, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "CDM":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 77, maxValue: 99 }],
        ["sprintSpeed", { value: 76, maxValue: 99 }],
        ["finishing", { value: 69, maxValue: 99 }],
        ["freeKickAccuracy", { value: 71, maxValue: 99 }],
        ["headingAccuracy", { value: 72, maxValue: 99 }],
        ["shotPower", { value: 67, maxValue: 99 }],
        ["longShots", { value: 77, maxValue: 99 }],
        ["volleys", { value: 67, maxValue: 99 }],
        ["penalties", { value: 70, maxValue: 99 }],
        ["vision", { value: 76, maxValue: 99 }],
        ["crossing", { value: 71, maxValue: 99 }],
        ["longPassing", { value: 76, maxValue: 99 }],
        ["shortPassing", { value: 75, maxValue: 99 }],
        ["curve", { value: 73, maxValue: 99 }],
        ["agility", { value: 79, maxValue: 99 }],
        ["balance", { value: 74, maxValue: 99 }],
        ["positioning", { value: 70, maxValue: 99 }],
        ["ballControl", { value: 75, maxValue: 99 }],
        ["dribbling", { value: 74, maxValue: 99 }],
        ["interceptions", { value: 84, maxValue: 99 }],
        ["defAwareness", { value: 81, maxValue: 99 }],
        ["standingTackle", { value: 76, maxValue: 99 }],
        ["slidingTackle", { value: 75, maxValue: 99 }],
        ["jumping", { value: 76, maxValue: 99 }],
        ["stamina", { value: 86, maxValue: 99 }],
        ["strength", { value: 75, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 81, maxValue: 99 }],
        ["composure", { value: 86, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "CM":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 78, maxValue: 99 }],
        ["sprintSpeed", { value: 77, maxValue: 99 }],
        ["finishing", { value: 70, maxValue: 99 }],
        ["freeKickAccuracy", { value: 80, maxValue: 99 }],
        ["headingAccuracy", { value: 65, maxValue: 99 }],
        ["shotPower", { value: 70, maxValue: 99 }],
        ["longShots", { value: 80, maxValue: 99 }],
        ["volleys", { value: 67, maxValue: 99 }],
        ["penalties", { value: 75, maxValue: 99 }],
        ["vision", { value: 79, maxValue: 99 }],
        ["crossing", { value: 78, maxValue: 99 }],
        ["longPassing", { value: 80, maxValue: 99 }],
        ["shortPassing", { value: 80, maxValue: 99 }],
        ["curve", { value: 79, maxValue: 99 }],
        ["agility", { value: 81, maxValue: 99 }],
        ["balance", { value: 77, maxValue: 99 }],
        ["positioning", { value: 75, maxValue: 99 }],
        ["ballControl", { value: 81, maxValue: 99 }],
        ["dribbling", { value: 80, maxValue: 99 }],
        ["interceptions", { value: 80, maxValue: 99 }],
        ["defAwareness", { value: 74, maxValue: 99 }],
        ["standingTackle", { value: 69, maxValue: 99 }],
        ["slidingTackle", { value: 70, maxValue: 99 }],
        ["jumping", { value: 71, maxValue: 99 }],
        ["stamina", { value: 81, maxValue: 99 }],
        ["strength", { value: 71, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 73, maxValue: 99 }],
        ["composure", { value: 83, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "LM":
    case "RM":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 82, maxValue: 99 }],
        ["sprintSpeed", { value: 80, maxValue: 99 }],
        ["finishing", { value: 74, maxValue: 99 }],
        ["freeKickAccuracy", { value: 80, maxValue: 99 }],
        ["headingAccuracy", { value: 62, maxValue: 99 }],
        ["shotPower", { value: 69, maxValue: 99 }],
        ["longShots", { value: 71, maxValue: 99 }],
        ["volleys", { value: 72, maxValue: 99 }],
        ["penalties", { value: 75, maxValue: 99 }],
        ["vision", { value: 76, maxValue: 99 }],
        ["crossing", { value: 82, maxValue: 99 }],
        ["longPassing", { value: 68, maxValue: 99 }],
        ["shortPassing", { value: 80, maxValue: 99 }],
        ["curve", { value: 80, maxValue: 99 }],
        ["agility", { value: 84, maxValue: 99 }],
        ["balance", { value: 83, maxValue: 99 }],
        ["positioning", { value: 77, maxValue: 99 }],
        ["ballControl", { value: 81, maxValue: 99 }],
        ["dribbling", { value: 82, maxValue: 99 }],
        ["interceptions", { value: 64, maxValue: 99 }],
        ["defAwareness", { value: 65, maxValue: 99 }],
        ["standingTackle", { value: 62, maxValue: 99 }],
        ["slidingTackle", { value: 59, maxValue: 99 }],
        ["jumping", { value: 69, maxValue: 99 }],
        ["stamina", { value: 79, maxValue: 99 }],
        ["strength", { value: 71, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 69, maxValue: 99 }],
        ["composure", { value: 83, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "CAM":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 81, maxValue: 99 }],
        ["sprintSpeed", { value: 77, maxValue: 99 }],
        ["finishing", { value: 75, maxValue: 99 }],
        ["freeKickAccuracy", { value: 79, maxValue: 99 }],
        ["headingAccuracy", { value: 63, maxValue: 99 }],
        ["shotPower", { value: 69, maxValue: 99 }],
        ["longShots", { value: 77, maxValue: 99 }],
        ["volleys", { value: 73, maxValue: 99 }],
        ["penalties", { value: 77, maxValue: 99 }],
        ["vision", { value: 80, maxValue: 99 }],
        ["crossing", { value: 80, maxValue: 99 }],
        ["longPassing", { value: 78, maxValue: 99 }],
        ["shortPassing", { value: 81, maxValue: 99 }],
        ["curve", { value: 82, maxValue: 99 }],
        ["agility", { value: 84, maxValue: 99 }],
        ["balance", { value: 80, maxValue: 99 }],
        ["positioning", { value: 77, maxValue: 99 }],
        ["ballControl", { value: 84, maxValue: 99 }],
        ["dribbling", { value: 83, maxValue: 99 }],
        ["interceptions", { value: 64, maxValue: 99 }],
        ["defAwareness", { value: 65, maxValue: 99 }],
        ["standingTackle", { value: 63, maxValue: 99 }],
        ["slidingTackle", { value: 61, maxValue: 99 }],
        ["jumping", { value: 66, maxValue: 99 }],
        ["stamina", { value: 80, maxValue: 99 }],
        ["strength", { value: 58, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 62, maxValue: 99 }],
        ["composure", { value: 83, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "LW":
    case "RW":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 84, maxValue: 99 }],
        ["sprintSpeed", { value: 82, maxValue: 99 }],
        ["finishing", { value: 76, maxValue: 99 }],
        ["freeKickAccuracy", { value: 78, maxValue: 99 }],
        ["headingAccuracy", { value: 59, maxValue: 99 }],
        ["shotPower", { value: 67, maxValue: 99 }],
        ["longShots", { value: 67, maxValue: 99 }],
        ["volleys", { value: 74, maxValue: 99 }],
        ["penalties", { value: 75, maxValue: 99 }],
        ["vision", { value: 76, maxValue: 99 }],
        ["crossing", { value: 79, maxValue: 99 }],
        ["longPassing", { value: 70, maxValue: 99 }],
        ["shortPassing", { value: 81, maxValue: 99 }],
        ["curve", { value: 83, maxValue: 99 }],
        ["agility", { value: 86, maxValue: 99 }],
        ["balance", { value: 81, maxValue: 99 }],
        ["positioning", { value: 78, maxValue: 99 }],
        ["ballControl", { value: 82, maxValue: 99 }],
        ["dribbling", { value: 85, maxValue: 99 }],
        ["interceptions", { value: 64, maxValue: 99 }],
        ["defAwareness", { value: 52, maxValue: 99 }],
        ["standingTackle", { value: 60, maxValue: 99 }],
        ["slidingTackle", { value: 56, maxValue: 99 }],
        ["jumping", { value: 67, maxValue: 99 }],
        ["stamina", { value: 77, maxValue: 99 }],
        ["strength", { value: 59, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 62, maxValue: 99 }],
        ["composure", { value: 85, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "CF":
    case "LF":
    case "RF":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 77, maxValue: 99 }],
        ["sprintSpeed", { value: 73, maxValue: 99 }],
        ["finishing", { value: 83, maxValue: 99 }],
        ["freeKickAccuracy", { value: 80, maxValue: 99 }],
        ["headingAccuracy", { value: 73, maxValue: 99 }],
        ["shotPower", { value: 77, maxValue: 99 }],
        ["longShots", { value: 81, maxValue: 99 }],
        ["volleys", { value: 77, maxValue: 99 }],
        ["penalties", { value: 82, maxValue: 99 }],
        ["vision", { value: 81, maxValue: 99 }],
        ["crossing", { value: 75, maxValue: 99 }],
        ["longPassing", { value: 67, maxValue: 99 }],
        ["shortPassing", { value: 81, maxValue: 99 }],
        ["curve", { value: 78, maxValue: 99 }],
        ["agility", { value: 79, maxValue: 99 }],
        ["balance", { value: 83, maxValue: 99 }],
        ["positioning", { value: 84, maxValue: 99 }],
        ["ballControl", { value: 80, maxValue: 99 }],
        ["dribbling", { value: 84, maxValue: 99 }],
        ["interceptions", { value: 60, maxValue: 99 }],
        ["defAwareness", { value: 50, maxValue: 99 }],
        ["standingTackle", { value: 71, maxValue: 99 }],
        ["slidingTackle", { value: 59, maxValue: 99 }],
        ["jumping", { value: 73, maxValue: 99 }],
        ["stamina", { value: 79, maxValue: 99 }],
        ["strength", { value: 76, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 70, maxValue: 99 }],
        ["composure", { value: 86, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    case "ST":
      return new Map<AttributeName, { value: number; maxValue: 5 | 99 }>([
        ["acceleration", { value: 81, maxValue: 99 }],
        ["sprintSpeed", { value: 77, maxValue: 99 }],
        ["finishing", { value: 82, maxValue: 99 }],
        ["freeKickAccuracy", { value: 78, maxValue: 99 }],
        ["headingAccuracy", { value: 72, maxValue: 99 }],
        ["shotPower", { value: 77, maxValue: 99 }],
        ["longShots", { value: 78, maxValue: 99 }],
        ["volleys", { value: 79, maxValue: 99 }],
        ["penalties", { value: 83, maxValue: 99 }],
        ["vision", { value: 73, maxValue: 99 }],
        ["crossing", { value: 71, maxValue: 99 }],
        ["longPassing", { value: 64, maxValue: 99 }],
        ["shortPassing", { value: 80, maxValue: 99 }],
        ["curve", { value: 78, maxValue: 99 }],
        ["agility", { value: 78, maxValue: 99 }],
        ["balance", { value: 80, maxValue: 99 }],
        ["positioning", { value: 85, maxValue: 99 }],
        ["ballControl", { value: 80, maxValue: 99 }],
        ["dribbling", { value: 81, maxValue: 99 }],
        ["interceptions", { value: 60, maxValue: 99 }],
        ["defAwareness", { value: 50, maxValue: 99 }],
        ["standingTackle", { value: 52, maxValue: 99 }],
        ["slidingTackle", { value: 59, maxValue: 99 }],
        ["jumping", { value: 70, maxValue: 99 }],
        ["stamina", { value: 77, maxValue: 99 }],
        ["strength", { value: 73, maxValue: 99 }],
        ["reactions", { value: 85, maxValue: 99 }],
        ["aggression", { value: 66, maxValue: 99 }],
        ["composure", { value: 88, maxValue: 99 }],
        ["gkDiving", { value: 10, maxValue: 99 }],
        ["gkHandling", { value: 10, maxValue: 99 }],
        ["gkKicking", { value: 10, maxValue: 99 }],
        ["gkReflexes", { value: 10, maxValue: 99 }],
        ["gkPositioning", { value: 10, maxValue: 99 }],
      ]);
    default:
      throw new Error(`Unknown position: ${position}`);
  }
};

const getAttribute = (
  attribute: AttributeName,
  maxValue: 5 | 99,
): [AttributeName, PlayerAttribute] => [
  attribute,
  {
    value: atom((get) => {
      const player = get(playerAtom);
      const position = get(player.position);
      const height = get(player.height);
      const weight = get(player.weight);
      const baseValue = getAttributesByPosition(position).get(attribute)!.value;
      const heightModifier = getHeightModifiers(height).get(attribute) || 0;
      const weightModifier = getWeightModifiers(weight).get(attribute) || 0;
      const nodesModifier =
        getNodesModifiers(player.forests).get(attribute) || 0;
      return Math.floor(
        baseValue + heightModifier + weightModifier + nodesModifier,
      );
    }),
    maxValue: maxValue,
  },
];

const getCheapestBranch = (startNode: GraphNode, graph: Graph): GraphNode[] => {
  const getAllBranches = (startNode: GraphNode): GraphNode[][] => {
    if (startNode.isActive) return [[]];
    return startNode.parentIds.length === 0
      ? [[startNode]]
      : startNode.parentIds
          .flatMap((parentId) => getAllBranches(graph.get(parentId)!))
          .map((path) => [startNode, ...path]);
  };

  const getBranchCost = (nodes: GraphNode[]) =>
    sum(nodes, (node) => node.baseActivationCost);

  return getAllBranches(startNode).reduce((cheapestBranch, branch) =>
    getBranchCost(branch) < getBranchCost(cheapestBranch)
      ? branch
      : cheapestBranch,
  );
};

const toForest = (graphs: Graph[], forestName: AttributeCategoryName) =>
  graphs.map(
    (graph, i) =>
      new Map<string, TreeNode>(
        [...graph.entries()].map(([attribute, node]) => {
          const isActiveAtom = atom(
            node.isActive,
            (get, set, nextValue?: boolean) => {
              nextValue = nextValue ?? !get(isActiveAtom);
              set(isActiveAtom, nextValue);
              const tree = get(playerAtom).forests.get(forestName)!.at(i)!;
              if (nextValue)
                getCheapestBranch(node, graph).forEach((n) => {
                  set(tree.get(n.id)!.isActive, true);
                });
              else
                node.childrenIds.forEach((childId) => {
                  const child = tree.get(childId)!;
                  if (
                    get(child.isActive) &&
                    !child.parentIds.some((id) => get(tree.get(id)!.isActive))
                  )
                    set(child.isActive, false);
                });
            },
          );
          return [
            attribute,
            {
              ...node,
              actualActivationCost: atom(() =>
                sum(getCheapestBranch(node, graph)),
              ),
              isActive: isActiveAtom,
            },
          ];
        }),
      ),
  );

const skillPointsByLevel = new Map<number, number>([
  [1, 10],
  [2, 11],
  [3, 12],
  [4, 14],
  [5, 15],
  [6, 16],
  [7, 18],
  [8, 19],
  [9, 20],
  [10, 23],
  [11, 24],
  [12, 25],
  [13, 27],
  [14, 28],
  [15, 31],
  [16, 33],
  [17, 34],
  [18, 35],
  [19, 36],
  [20, 37],
  [21, 39],
  [22, 40],
  [23, 42],
  [24, 43],
  [25, 44],
  [26, 46],
  [27, 47],
  [28, 49],
  [29, 50],
  [30, 53],
  [31, 54],
  [32, 55],
  [33, 57],
  [34, 58],
  [35, 59],
  [36, 62],
  [37, 63],
  [38, 65],
  [39, 66],
  [40, 68],
  [41, 69],
  [42, 70],
  [43, 72],
  [44, 73],
  [45, 74],
  [46, 76],
  [47, 77],
  [48, 78],
  [49, 79],
  [50, 84],
  [51, 85],
  [52, 86],
  [53, 88],
  [54, 89],
  [55, 90],
  [56, 92],
  [57, 93],
  [58, 94],
  [59, 96],
  [60, 97],
  [61, 98],
  [62, 100],
  [63, 101],
  [64, 102],
  [65, 105],
  [66, 106],
  [67, 107],
  [68, 109],
  [69, 110],
  [70, 111],
  [71, 113],
  [72, 114],
  [73, 115],
  [74, 117],
  [75, 118],
  [76, 119],
  [77, 121],
  [78, 122],
  [79, 123],
  [80, 125],
  [81, 126],
  [82, 127],
  [83, 129],
  [84, 130],
  [85, 131],
  [86, 133],
  [87, 134],
  [88, 135],
  [89, 137],
  [90, 138],
  [91, 139],
  [92, 141],
  [93, 142],
  [94, 143],
  [95, 145],
  [96, 146],
  [97, 147],
  [98, 149],
  [99, 150],
  [100, 160],
]);

const basePlayer: Player = {
  level: atom(100),
  availableSkillPoints: atom((get) => {
    const player = get(playerAtom);
    const totalSkillPoints = skillPointsByLevel.get(get(player.level))!;
    const spentSkillPoints = sum(
      getActiveNodes(player.forests),
      (node) => node.baseActivationCost,
    );
    return totalSkillPoints - spentSkillPoints;
  }),
  position: atom<Position>("ST"),
  height: atom(178),
  weight: atom(80),
  weakFoot: atom(2), // This must be always initialized to 2
  skillMoves: atom(3), // This must be always initialized to 3
  attributes: new Map<AttributeName, PlayerAttribute>([
    getAttribute("acceleration", 99),
    getAttribute("sprintSpeed", 99),
    getAttribute("positioning", 99),
    getAttribute("finishing", 99),
    getAttribute("shotPower", 99),
    getAttribute("longShots", 99),
    getAttribute("longShots", 99),
    getAttribute("volleys", 99),
    getAttribute("penalties", 99),
    getAttribute("vision", 99),
    getAttribute("crossing", 99),
    getAttribute("freeKickAccuracy", 99),
    getAttribute("shortPassing", 99),
    getAttribute("longPassing", 99),
    getAttribute("curve", 99),
    getAttribute("ballControl", 99),
    getAttribute("dribbling", 99),
    getAttribute("agility", 99),
    getAttribute("reactions", 99),
    getAttribute("balance", 99),
    getAttribute("composure", 99),
    getAttribute("interceptions", 99),
    getAttribute("headingAccuracy", 99),
    getAttribute("defAwareness", 99),
    getAttribute("slidingTackle", 99),
    getAttribute("standingTackle", 99),
    getAttribute("aggression", 99),
    getAttribute("jumping", 99),
    getAttribute("stamina", 99),
    getAttribute("strength", 99),
    getAttribute("gkDiving", 99),
    getAttribute("gkHandling", 99),
    getAttribute("gkKicking", 99),
    getAttribute("gkPositioning", 99),
    getAttribute("gkReflexes", 99),
  ]),
  forests: new Map([
    ["pace", toForest(paceTrees, "pace")],
    ["shooting", toForest(shootingTrees, "shooting")],
    ["passing", toForest(passingTrees, "passing")],
    ["dribbling", toForest(dribblingTrees, "dribbling")],
    ["defending", toForest(defendingTrees, "defending")],
    ["physicality", toForest(physicalityTrees, "physicality")],
    ["goalkeeping", toForest(goalkeepingTrees, "goalkeeping")],
  ]),
  accelerationRate: atom((get) => {
    const player = get(playerAtom);
    return getAccelerationRate(
      get(player.height),
      get(player.attributes.get("agility")!.value),
      get(player.attributes.get("strength")!.value),
      get(player.attributes.get("acceleration")!.value),
    );
  }),
};
export const playerAtom = atomWithStorage<Player>(
  "player",
  basePlayer,
  createJSONStorage(() => localStorage, jsonStorageOptions),
  // { getOnInit: true },
);

export const attributeNamesByCategory = new Map<
  AttributeCategoryName,
  AttributeName[]
>([
  ["pace", ["acceleration", "sprintSpeed"]],
  [
    "shooting",
    [
      "finishing",
      "freeKickAccuracy",
      "headingAccuracy",
      "shotPower",
      "longShots",
      "volleys",
      "penalties",
    ],
  ],
  ["passing", ["vision", "crossing", "longPassing", "shortPassing", "curve"]],
  [
    "dribbling",
    ["agility", "balance", "positioning", "ballControl", "dribbling"],
  ],
  [
    "defending",
    ["interceptions", "defAwareness", "standingTackle", "slidingTackle"],
  ],
  [
    "physicality",
    ["jumping", "stamina", "strength", "reactions", "aggression", "composure"],
  ],
  [
    "goalkeeping",
    ["gkDiving", "gkHandling", "gkKicking", "gkReflexes", "gkPositioning"],
  ],
]);

export const playerCategoryAttributesAtom = atom((get) => {
  const getAttributeCategoryValue = (categoryName: AttributeCategoryName) =>
    Math.floor(
      average(
        attributeNamesByCategory
          .get(categoryName)!
          .map((attributeName) =>
            get(get(playerAtom).attributes.get(attributeName)!.value),
          ),
      ),
    );

  return attributeCategories.map(
    (attributeCategory) =>
      ({
        name: attributeCategory,
        value: getAttributeCategoryValue(attributeCategory),
        maxValue: 99,
      }) as PlayerAttributeWithName,
  );
});

export const playerAttributesByCategoryAtom = atom(
  (get) =>
    new Map(
      [...attributeNamesByCategory.entries()].map(
        ([categoryName, attributeNames]) => {
          const player = get(playerAtom);
          return [
            categoryName,
            attributeNames.map(
              (attributeName) =>
                ({
                  name: attributeName,
                  value: get(player.attributes.get(attributeName)!.value),
                  maxValue: player.attributes.get(attributeName)!.maxValue,
                }) as PlayerAttributeWithName,
            ),
          ];
        },
      ),
    ),
);

export const deactivateAllNodesAtom = atom(null, (get, set) =>
  get(playerAtom).forests.forEach((forest) =>
    forest.forEach((tree) => tree.forEach((node) => set(node.isActive, false))),
  ),
);

export type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "CF"
  | "LF"
  | "RF"
  | "ST";

export type AccelerationRate =
  | "Explosive"
  | "Mostly Explosive"
  | "Controlled Explosive"
  | "Controlled"
  | "Controlled Lengthy"
  | "Mostly Lengthy"
  | "Lengthy";

export type AttributeCategoryName =
  | "pace"
  | "shooting"
  | "passing"
  | "dribbling"
  | "defending"
  | "physicality"
  | "goalkeeping";

export type AttributeName =
  | "acceleration"
  | "sprintSpeed"
  | "positioning"
  | "finishing"
  | "shotPower"
  | "longShots"
  | "volleys"
  | "penalties"
  | "vision"
  | "crossing"
  | "freeKickAccuracy"
  | "shortPassing"
  | "longPassing"
  | "curve"
  | "agility"
  | "balance"
  | "reactions"
  | "ballControl"
  | "dribbling"
  | "composure"
  | "interceptions"
  | "headingAccuracy"
  | "defAwareness"
  | "standingTackle"
  | "slidingTackle"
  | "jumping"
  | "stamina"
  | "strength"
  | "aggression"
  | "gkDiving"
  | "gkHandling"
  | "gkKicking"
  | "gkPositioning"
  | "gkReflexes"
  | "weakFoot"
  | "skillMoves";

export const getAccelerationRate = (
  height: number,
  agility: number,
  strength: number,
  acceleration: number,
): AccelerationRate => {
  const agilityVsStrengthDifference = agility - strength;

  if (
    height <= 175 &&
    agility >= 80 &&
    acceleration >= 80 &&
    agilityVsStrengthDifference >= 20
  )
    return "Explosive";

  if (
    height <= 182 &&
    agility >= 70 &&
    acceleration >= 80 &&
    agilityVsStrengthDifference >= 12
  )
    return "Mostly Explosive";

  if (
    height <= 182 &&
    agility >= 65 &&
    acceleration >= 70 &&
    agilityVsStrengthDifference >= 4
  )
    return "Controlled Explosive";

  if (
    height >= 188 &&
    strength >= 80 &&
    acceleration >= 55 &&
    agilityVsStrengthDifference <= -20
  )
    return "Lengthy";

  if (
    height >= 183 &&
    strength >= 75 &&
    acceleration >= 55 &&
    agilityVsStrengthDifference <= -12
  )
    return "Mostly Lengthy";

  if (
    height >= 181 &&
    strength >= 65 &&
    acceleration >= 40 &&
    agilityVsStrengthDifference <= -4
  )
    return "Controlled Lengthy";

  return "Controlled";
};

export interface PlayerAttribute {
  value: Atom<number>;
  maxValue: number;
}

export interface PlayerAttributeWithName {
  name: AttributeName;
  value: number;
  maxValue: 99;
}

export interface TreeNode {
  id: string;
  baseActivationCost: number;
  actualActivationCost: Atom<number>;
  isActive: WritableAtom<boolean, [boolean?], void>;
  parentIds: string[];
  childrenIds: string[];
  row: number;
  column: number;
  modifiers: Map<AttributeName, number>;
}

export type Tree = Map<string, TreeNode>;

export type Forest = Tree[];

export interface Player {
  level: PrimitiveAtom<number>;
  availableSkillPoints: Atom<number>;
  position: PrimitiveAtom<Position>;
  height: PrimitiveAtom<number>;
  weight: PrimitiveAtom<number>;
  weakFoot: PrimitiveAtom<number>;
  skillMoves: PrimitiveAtom<number>;
  attributes: Map<AttributeName, PlayerAttribute>;
  forests: Map<AttributeCategoryName, Forest>;
  accelerationRate: Atom<AccelerationRate>;
}

export type PlayerUpdate = (get: Getter, set: Setter) => void;

export const positions: Position[] = [
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

const attributeCategories: AttributeCategoryName[] = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physicality",
  "goalkeeping",
];
