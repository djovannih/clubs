import { atomWithToggle, jsonStorageOptions } from "@/atoms/utils";
import { defendingTrees } from "@/forests/defending";
import { dribblingTrees } from "@/forests/dribbling";
import { goalkeepingTrees } from "@/forests/goalkeeping";
import { paceTrees } from "@/forests/pace";
import { passingTrees } from "@/forests/passing";
import { physicalityTrees } from "@/forests/physicality";
import { shootingTrees } from "@/forests/shooting";
import { type Graph } from "@/lib/graph";
import { average, sum } from "@/lib/math";
import {
  type AccelerationRate,
  type AttributeName,
  getAccelerationRate,
  getAttributesByPosition,
  type AttributeCategoryName,
  type Position,
} from "@/lib/player";
import type { Getter, PrimitiveAtom, Setter } from "jotai";
import { type Atom, atom, type WritableAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const getActiveNodes = (
  forests: Map<AttributeCategoryName, Map<string, TreeNode>[]>,
) =>
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
  forests: Map<AttributeCategoryName, Map<string, TreeNode>[]>,
): Map<AttributeName, number> =>
  getActiveNodes(forests)
    .map((node) => node.modifiers)
    .reduce(
      (flatModifiers, modifiers) =>
        modifiers
          .entries()
          .reduce(
            (mergedModifiers, [attribute, modifier]) =>
              mergedModifiers.set(
                attribute,
                (mergedModifiers.get(attribute) || 0) + modifier,
              ),
            flatModifiers,
          ),
      new Map<AttributeName, number>(),
    );

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
      const heightModifier = getHeightModifiers(height).get(attribute)!;
      const weightModifier = getWeightModifiers(weight).get(attribute)!;
      const nodesModifier = getNodesModifiers(player.forests).get(attribute)!;
      return baseValue + heightModifier + weightModifier + nodesModifier;
    }),
    maxValue: maxValue,
  },
];

const toTrees = (graphs: Graph[]) =>
  graphs.map(
    (graph) =>
      new Map<string, TreeNode>(
        graph.entries().map(([attribute, node]) => [
          attribute,
          {
            ...node,
            isActive: atomWithToggle(node.isActive),
          } as TreeNode,
        ]),
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
      (node) => node.activationCost,
    );
    return totalSkillPoints - spentSkillPoints;
  }),
  position: atom<Position>("ST"),
  height: atom(160),
  weight: atom(45),
  weakFoot: atom(2),
  skillMoves: atom(3),
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
    ["pace", toTrees(paceTrees)],
    ["shooting", toTrees(shootingTrees)],
    ["passing", toTrees(passingTrees)],
    ["dribbling", toTrees(dribblingTrees)],
    ["defending", toTrees(defendingTrees)],
    ["physicality", toTrees(physicalityTrees)],
    ["goalkeeping", toTrees(goalkeepingTrees)],
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
    average(
      attributeNamesByCategory
        .get(categoryName)!
        .map((attributeName) =>
          get(get(playerAtom).attributes.get(attributeName)!.value),
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
  activationCost: number;
  isActive: WritableAtom<boolean, [boolean?], void>;
  parentIds: string[];
  childrenIds: string[];
  row: number;
  column: number;
  modifiers: Map<AttributeName, number>;
}

export interface Player {
  level: PrimitiveAtom<number>;
  availableSkillPoints: Atom<number>;
  position: PrimitiveAtom<Position>;
  height: PrimitiveAtom<number>;
  weight: PrimitiveAtom<number>;
  weakFoot: PrimitiveAtom<number>;
  skillMoves: PrimitiveAtom<number>;
  attributes: Map<AttributeName, PlayerAttribute>;
  forests: Map<AttributeCategoryName, Map<string, TreeNode>[]>;
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
