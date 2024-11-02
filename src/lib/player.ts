import { type GraphNode } from "./graph";

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

export type PlayerAttribute = {
  value: number;
  maxValue: 99;
};

export type Player = {
  level: number;
  availableSkillPoints: number;
  position: Position;
  height: number;
  weight: number;
  attributes: Map<AttributeName, PlayerAttribute>;
  weakFoot: number;
  skillMoves: number;
};

export type AttributeUpdate = {
  attributeName: AttributeName;
  updateValue: number;
};

const updatePlayerAttributess = (
  player: Player,
  action: AttributeUpdate,
  actionType: "INC" | "DEC",
): Player => {
  if (action.attributeName === "weakFoot")
    return {
      ...player,
      weakFoot:
        player.weakFoot +
        (actionType === "INC" ? action.updateValue : -action.updateValue),
    };

  if (action.attributeName === "skillMoves")
    return {
      ...player,
      skillMoves:
        player.skillMoves +
        (actionType === "INC" ? action.updateValue : -action.updateValue),
    };

  const attribute = player.attributes.get(action.attributeName)!;
  return {
    ...player,
    attributes: new Map(
      player.attributes.set(action.attributeName, {
        ...attribute,
        value:
          attribute.value +
          (actionType === "INC" ? action.updateValue : -action.updateValue),
      }),
    ),
  };
};

export const updatePlayer = (
  player: Player,
  toggledNodes: GraphNode[],
  actionType: "INC" | "DEC",
): Player => {
  const cost = toggledNodes.reduce(
    (totalCost, node) => totalCost + node.activationCost,
    0,
  );
  return toggledNodes
    .flatMap((node) => node.modifiers)
    .reduce(
      (player, action) => updatePlayerAttributess(player, action, actionType),
      {
        ...player,
        availableSkillPoints:
          player.availableSkillPoints + (actionType === "INC" ? -cost : cost),
      },
    );
};

export const getHeightModifiers = (height: number): AttributeUpdate[] => {
  //  height >= 160 && height <= 162
  if (height <= 162) return [];

  if (height >= 163 && height <= 167)
    return [
      { attributeName: "acceleration", updateValue: -1 },
      { attributeName: "longPassing", updateValue: 1 },
      { attributeName: "balance", updateValue: -1 },
      { attributeName: "defAwareness", updateValue: 1 },
      { attributeName: "standingTackle", updateValue: -1 },
      { attributeName: "slidingTackle", updateValue: -1 },
      { attributeName: "jumping", updateValue: 1 },
      { attributeName: "stamina", updateValue: 1 },
      { attributeName: "strength", updateValue: 1 },
      { attributeName: "aggression", updateValue: 1 },
    ];

  if (height >= 168 && height <= 172)
    return [
      { attributeName: "acceleration", updateValue: -2 },
      { attributeName: "sprintSpeed", updateValue: 1 },
      { attributeName: "headingAccuracy", updateValue: 1 },
      { attributeName: "shotPower", updateValue: 1 },
      { attributeName: "vision", updateValue: 1 },
      { attributeName: "longPassing", updateValue: 2 },
      { attributeName: "shortPassing", updateValue: -1 },
      { attributeName: "curve", updateValue: -1 },
      { attributeName: "agility", updateValue: -1 },
      { attributeName: "balance", updateValue: -2 },
      { attributeName: "ballControl", updateValue: -1 },
      { attributeName: "dribbling", updateValue: -1 },
      { attributeName: "defAwareness", updateValue: -2 },
      { attributeName: "standingTackle", updateValue: -2 },
      { attributeName: "slidingTackle", updateValue: -2 },
      { attributeName: "jumping", updateValue: 2 },
      { attributeName: "stamina", updateValue: 2 },
      { attributeName: "strength", updateValue: 2 },
      { attributeName: "aggression", updateValue: 2 },
    ];

  if (height >= 173 && height <= 177)
    return [
      { attributeName: "acceleration", updateValue: -3 },
      { attributeName: "sprintSpeed", updateValue: 1 },
      { attributeName: "finishing", updateValue: 1 },
      { attributeName: "headingAccuracy", updateValue: 2 },
      { attributeName: "shotPower", updateValue: 1 },
      { attributeName: "volleys", updateValue: 1 },
      { attributeName: "vision", updateValue: 1 },
      { attributeName: "longPassing", updateValue: 3 },
      { attributeName: "shortPassing", updateValue: -1 },
      { attributeName: "curve", updateValue: -1 },
      { attributeName: "agility", updateValue: -1 },
      { attributeName: "balance", updateValue: -3 },
      { attributeName: "ballControl", updateValue: -1 },
      { attributeName: "dribbling", updateValue: -2 },
      { attributeName: "defAwareness", updateValue: -3 },
      { attributeName: "standingTackle", updateValue: -3 },
      { attributeName: "slidingTackle", updateValue: -3 },
      { attributeName: "jumping", updateValue: 3 },
      { attributeName: "stamina", updateValue: 3 },
      { attributeName: "strength", updateValue: 3 },
      { attributeName: "aggression", updateValue: 3 },
    ];

  if (height >= 178 && height <= 182)
    return [
      { attributeName: "acceleration", updateValue: -4 },
      { attributeName: "sprintSpeed", updateValue: 2 },
      { attributeName: "finishing", updateValue: 1 },
      { attributeName: "headingAccuracy", updateValue: 3 },
      { attributeName: "shotPower", updateValue: 2 },
      { attributeName: "longShots", updateValue: 1 },
      { attributeName: "volleys", updateValue: 1 },
      { attributeName: "vision", updateValue: 2 },
      { attributeName: "longPassing", updateValue: 4 },
      { attributeName: "shortPassing", updateValue: -2 },
      { attributeName: "curve", updateValue: -2 },
      { attributeName: "agility", updateValue: -2 },
      { attributeName: "balance", updateValue: -4 },
      { attributeName: "ballControl", updateValue: -2 },
      { attributeName: "dribbling", updateValue: -3 },
      { attributeName: "defAwareness", updateValue: -4 },
      { attributeName: "standingTackle", updateValue: -4 },
      { attributeName: "slidingTackle", updateValue: -4 },
      { attributeName: "jumping", updateValue: 4 },
      { attributeName: "stamina", updateValue: 4 },
      { attributeName: "strength", updateValue: 4 },
      { attributeName: "aggression", updateValue: 4 },
      { attributeName: "composure", updateValue: 1 },
    ];

  if (height >= 183 && height <= 187)
    return [
      { attributeName: "acceleration", updateValue: -6 },
      { attributeName: "sprintSpeed", updateValue: 1 },
      { attributeName: "finishing", updateValue: 2 },
      { attributeName: "headingAccuracy", updateValue: 4 },
      { attributeName: "shotPower", updateValue: 2 },
      { attributeName: "longShots", updateValue: 1 },
      { attributeName: "volleys", updateValue: 1 },
      { attributeName: "vision", updateValue: 2 },
      { attributeName: "longPassing", updateValue: 5 },
      { attributeName: "shortPassing", updateValue: -2 },
      { attributeName: "curve", updateValue: -2 },
      { attributeName: "agility", updateValue: -3 },
      { attributeName: "balance", updateValue: -5 },
      { attributeName: "ballControl", updateValue: -2 },
      { attributeName: "dribbling", updateValue: -4 },
      { attributeName: "defAwareness", updateValue: -5 },
      { attributeName: "standingTackle", updateValue: -5 },
      { attributeName: "slidingTackle", updateValue: -5 },
      { attributeName: "jumping", updateValue: 5 },
      { attributeName: "stamina", updateValue: 3 },
      { attributeName: "strength", updateValue: 5 },
      { attributeName: "reactions", updateValue: -1 },
      { attributeName: "aggression", updateValue: 6 },
      { attributeName: "composure", updateValue: 1 },
    ];

  if (height >= 188 && height <= 192)
    return [
      { attributeName: "acceleration", updateValue: -10 },
      { attributeName: "sprintSpeed", updateValue: -3 },
      { attributeName: "finishing", updateValue: 2 },
      { attributeName: "headingAccuracy", updateValue: 5 },
      { attributeName: "shotPower", updateValue: 3 },
      { attributeName: "longShots", updateValue: 1 },
      { attributeName: "volleys", updateValue: 2 },
      { attributeName: "vision", updateValue: 3 },
      { attributeName: "crossing", updateValue: 2 },
      { attributeName: "longPassing", updateValue: 6 },
      { attributeName: "shortPassing", updateValue: -3 },
      { attributeName: "curve", updateValue: -3 },
      { attributeName: "agility", updateValue: -5 },
      { attributeName: "balance", updateValue: -6 },
      { attributeName: "ballControl", updateValue: -3 },
      { attributeName: "dribbling", updateValue: -6 },
      { attributeName: "defAwareness", updateValue: -6 },
      { attributeName: "standingTackle", updateValue: -6 },
      { attributeName: "slidingTackle", updateValue: -6 },
      { attributeName: "jumping", updateValue: 3 },
      { attributeName: "stamina", updateValue: 1 },
      { attributeName: "strength", updateValue: 6 },
      { attributeName: "reactions", updateValue: -2 },
      { attributeName: "aggression", updateValue: 8 },
      { attributeName: "composure", updateValue: 1 },
    ];

  // height >= 193 && height <= 195
  return [
    { attributeName: "acceleration", updateValue: -14 },
    { attributeName: "sprintSpeed", updateValue: -7 },
    { attributeName: "finishing", updateValue: 1 },
    { attributeName: "headingAccuracy", updateValue: 6 },
    { attributeName: "shotPower", updateValue: 3 },
    { attributeName: "longShots", updateValue: 1 },
    { attributeName: "volleys", updateValue: 2 },
    { attributeName: "vision", updateValue: 3 },
    { attributeName: "crossing", updateValue: 2 },
    { attributeName: "longPassing", updateValue: 7 },
    { attributeName: "shortPassing", updateValue: -4 },
    { attributeName: "curve", updateValue: -3 },
    { attributeName: "agility", updateValue: -9 },
    { attributeName: "balance", updateValue: -7 },
    { attributeName: "ballControl", updateValue: -4 },
    { attributeName: "dribbling", updateValue: -9 },
    { attributeName: "defAwareness", updateValue: -7 },
    { attributeName: "standingTackle", updateValue: -7 },
    { attributeName: "slidingTackle", updateValue: -7 },
    { attributeName: "stamina", updateValue: -3 },
    { attributeName: "strength", updateValue: 7 },
    { attributeName: "reactions", updateValue: -4 },
    { attributeName: "aggression", updateValue: 10 },
    { attributeName: "composure", updateValue: 2 },
  ];
};

export const updatePlayerHeight = (player: Player, height: number): Player => ({
  ...getHeightModifiers(height).reduce(
    (updatedPlayer, action) =>
      updatePlayerAttributess(updatedPlayer, action, "INC"),
    getHeightModifiers(player.height).reduce(
      (updatedPlayer, action) =>
        updatePlayerAttributess(updatedPlayer, action, "DEC"),
      player,
    ),
  ),
  height: height,
});

export const getWeightUpdateAttributeActions = (
  weight: number,
): AttributeUpdate[] => {
  // weight >= 45 && weight <= 54
  if (weight <= 54) return [];

  if (weight >= 55 && weight <= 68)
    return [
      { attributeName: "acceleration", updateValue: -1 },
      { attributeName: "sprintSpeed", updateValue: -1 },
      { attributeName: "headingAccuracy", updateValue: 1 },
      { attributeName: "longPassing", updateValue: 1 },
      { attributeName: "shortPassing", updateValue: -1 },
      { attributeName: "agility", updateValue: -1 },
      { attributeName: "jumping", updateValue: 1 },
      { attributeName: "strength", updateValue: 1 },
    ];

  if (weight >= 69 && weight <= 79)
    return [
      { attributeName: "acceleration", updateValue: -2 },
      { attributeName: "sprintSpeed", updateValue: -2 },
      { attributeName: "freeKickAccuracy", updateValue: 1 },
      { attributeName: "headingAccuracy", updateValue: 1 },
      { attributeName: "shotPower", updateValue: 1 },
      { attributeName: "longShots", updateValue: 1 },
      { attributeName: "volleys", updateValue: 1 },
      { attributeName: "longPassing", updateValue: 2 },
      { attributeName: "shortPassing", updateValue: -2 },
      { attributeName: "agility", updateValue: -2 },
      { attributeName: "balance", updateValue: 1 },
      { attributeName: "dribbling", updateValue: -1 },
      { attributeName: "jumping", updateValue: 3 },
      { attributeName: "stamina", updateValue: -1 },
      { attributeName: "strength", updateValue: 2 },
    ];

  if (weight >= 80 && weight <= 90)
    return [
      { attributeName: "acceleration", updateValue: -3 },
      { attributeName: "sprintSpeed", updateValue: -2 },
      { attributeName: "finishing", updateValue: 1 },
      { attributeName: "freeKickAccuracy", updateValue: 1 },
      { attributeName: "headingAccuracy", updateValue: 2 },
      { attributeName: "shotPower", updateValue: 1 },
      { attributeName: "longShots", updateValue: 1 },
      { attributeName: "volleys", updateValue: 1 },
      { attributeName: "longPassing", updateValue: 3 },
      { attributeName: "shortPassing", updateValue: -2 },
      { attributeName: "agility", updateValue: -3 },
      { attributeName: "balance", updateValue: 1 },
      { attributeName: "dribbling", updateValue: -1 },
      { attributeName: "jumping", updateValue: 1 },
      { attributeName: "stamina", updateValue: -1 },
      { attributeName: "strength", updateValue: 3 },
    ];

  // weight >= 91 && weight <= 115
  return [
    { attributeName: "acceleration", updateValue: -5 },
    { attributeName: "sprintSpeed", updateValue: -2 },
    { attributeName: "finishing", updateValue: 1 },
    { attributeName: "freeKickAccuracy", updateValue: 2 },
    { attributeName: "headingAccuracy", updateValue: 2 },
    { attributeName: "shotPower", updateValue: 2 },
    { attributeName: "longShots", updateValue: 2 },
    { attributeName: "volleys", updateValue: 2 },
    { attributeName: "penalties", updateValue: 1 },
    { attributeName: "longPassing", updateValue: 4 },
    { attributeName: "shortPassing", updateValue: -3 },
    { attributeName: "agility", updateValue: -5 },
    { attributeName: "balance", updateValue: 2 },
    { attributeName: "positioning", updateValue: 1 },
    { attributeName: "dribbling", updateValue: -2 },
    { attributeName: "jumping", updateValue: -1 },
    { attributeName: "stamina", updateValue: -2 },
    { attributeName: "strength", updateValue: 4 },
  ];
};

export const updatePlayerWeight = (player: Player, weight: number): Player => ({
  ...getWeightUpdateAttributeActions(weight).reduce(
    (updatedPlayer, action) =>
      updatePlayerAttributess(updatedPlayer, action, "INC"),
    getWeightUpdateAttributeActions(player.weight).reduce(
      (updatedPlayer, action) =>
        updatePlayerAttributess(updatedPlayer, action, "DEC"),
      player,
    ),
  ),
  weight: weight,
});

// TODO: Add remaining positions
export const getAttributesByPosition = (position: Position) => {
  switch (position) {
    case "GK":
      return new Map<AttributeName, PlayerAttribute>([
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
    default:
      throw new Error(`Unknown position: ${position}`);
  }
};

const getPlayerByPosition = (player: Player, position: Position): Player => {
  switch (position) {
    case "GK":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "CB":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "LB":
    case "RB":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "LWB":
    case "RWB":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "CDM":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "CM":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "LM":
    case "RM":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "CAM":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "LW":
    case "RW":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "CF":
    case "LF":
    case "RF":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    case "ST":
      return {
        ...player,
        position: position,
        attributes: new Map<AttributeName, PlayerAttribute>([
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
        ]),
      };
    default:
      return player;
  }
};

export const updatePlayerPosition = (
  player: Player,
  position: Position,
): Player =>
  updatePlayerWeight(
    updatePlayerHeight(getPlayerByPosition(player, position), player.height),
    player.weight,
  );

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

// export const getCategoryAttributes = (
//   attributes: Map<AttributeName, PlayerAttribute>,
// ) => {
//   return new Map<MainAttributeName, Map<AttributeName, PlayerAttribute>>([
//     [
//       "pace",
//       new Map([
//         ["acceleration", attributes.get("acceleration")!],
//         ["sprintSpeed", attributes.get("sprintSpeed")!],
//       ]),
//     ],
//     [
//       "shooting",
//       new Map([
//         ["positioning", attributes.get("positioning")!],
//         ["finishing", attributes.get("finishing")!],
//         ["shotPower", attributes.get("shotPower")!],
//         ["longShots", attributes.get("longShots")!],
//         ["volleys", attributes.get("volleys")!],
//         ["penalties", attributes.get("penalties")!],
//       ]),
//     ],
//     [
//       "passing",
//       new Map([
//         ["vision", attributes.get("vision")!],
//         ["crossing", attributes.get("crossing")!],
//         ["freeKickAccuracy", attributes.get("freeKickAccuracy")!],
//         ["shortPassing", attributes.get("shortPassing")!],
//         ["longPassing", attributes.get("longPassing")!],
//         ["curve", attributes.get("curve")!],
//       ]),
//     ],
//     [
//       "dribbling",
//       new Map([
//         ["agility", attributes.get("agility")!],
//         ["balance", attributes.get("balance")!],
//         ["reactions", attributes.get("reactions")!],
//         ["ballControl", attributes.get("ballControl")!],
//         ["dribbling", attributes.get("dribbling")!],
//         ["composure", attributes.get("composure")!],
//       ]),
//     ],
//     [
//       "defending",
//       new Map([
//         ["interceptions", attributes.get("interceptions")!],
//         ["headingAccuracy", attributes.get("headingAccuracy")!],
//         ["defAwareness", attributes.get("defAwareness")!],
//         ["standingTackle", attributes.get("standingTackle")!],
//         ["slidingTackle", attributes.get("slidingTackle")!],
//       ]),
//     ],
//     [
//       "physicality",
//       new Map([
//         ["jumping", attributes.get("jumping")!],
//         ["stamina", attributes.get("stamina")!],
//         ["strength", attributes.get("strength")!],
//         ["aggression", attributes.get("aggression")!],
//       ]),
//     ],
//     [
//       "goalkeeping",
//       new Map([
//         ["gkDiving", attributes.get("gkDiving")!],
//         ["gkHandling", attributes.get("gkHandling")!],
//         ["gkKicking", attributes.get("gkKicking")!],
//         ["gkPositioning", attributes.get("gkPositioning")!],
//         ["gkReflexes", attributes.get("gkReflexes")!],
//       ]),
//     ],
//   ]);
// };

export const getCategoryAttributes = (
  attributes: Map<AttributeName, PlayerAttribute>,
) => {
  return new Map<AttributeCategoryName, Map<AttributeName, PlayerAttribute>>([
    [
      "pace",
      new Map([
        ["acceleration", attributes.get("acceleration")!],
        ["sprintSpeed", attributes.get("sprintSpeed")!],
      ]),
    ],
    [
      "shooting",
      new Map([
        ["finishing", attributes.get("finishing")!],
        ["freeKickAccuracy", attributes.get("freeKickAccuracy")!],
        ["headingAccuracy", attributes.get("headingAccuracy")!],
        ["shotPower", attributes.get("shotPower")!],
        ["longShots", attributes.get("longShots")!],
        ["volleys", attributes.get("volleys")!],
        ["penalties", attributes.get("penalties")!],
        // ["weakFoot", attributes.get("weakFoot")!],
      ]),
    ],
    [
      "passing",
      new Map([
        ["vision", attributes.get("vision")!],
        ["crossing", attributes.get("crossing")!],
        ["longPassing", attributes.get("longPassing")!],
        ["shortPassing", attributes.get("shortPassing")!],
        ["curve", attributes.get("curve")!],
      ]),
    ],
    [
      "dribbling",
      new Map([
        ["agility", attributes.get("agility")!],
        ["balance", attributes.get("balance")!],
        ["positioning", attributes.get("positioning")!],
        ["ballControl", attributes.get("ballControl")!],
        ["dribbling", attributes.get("dribbling")!],
        // ["skillMoves", attributes.get("skillMoves")!],
      ]),
    ],
    [
      "defending",
      new Map([
        ["interceptions", attributes.get("interceptions")!],
        ["defAwareness", attributes.get("defAwareness")!],
        ["standingTackle", attributes.get("standingTackle")!],
        ["slidingTackle", attributes.get("slidingTackle")!],
      ]),
    ],
    [
      "physicality",
      new Map([
        ["jumping", attributes.get("jumping")!],
        ["stamina", attributes.get("stamina")!],
        ["strength", attributes.get("strength")!],
        ["reactions", attributes.get("reactions")!],
        ["aggression", attributes.get("aggression")!],
        ["composure", attributes.get("composure")!],
      ]),
    ],
    [
      "goalkeeping",
      new Map([
        ["gkDiving", attributes.get("gkDiving")!],
        ["gkHandling", attributes.get("gkHandling")!],
        ["gkKicking", attributes.get("gkKicking")!],
        ["gkPositioning", attributes.get("gkPositioning")!],
        ["gkReflexes", attributes.get("gkReflexes")!],
      ]),
    ],
  ]);
};
export const getMainAttributes = (
  attributes: Map<AttributeName, PlayerAttribute>,
) => {
  const getAverageValue = (values: number[]) =>
    Math.floor(values.reduce((acc, value) => acc + value, 0) / values.length);

  const categoryAttributes = getCategoryAttributes(attributes);

  return new Map<AttributeCategoryName, PlayerAttribute>(
    [...categoryAttributes.entries()].map(([mainAttributeName, catAttr]) => [
      mainAttributeName,
      {
        value: getAverageValue([...catAttr.values()].map((a) => a.value)),
        maxValue: 99,
      },
    ]),
  );
};
