type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "ST";

type AccelerationRate =
  | "Explosive"
  | "Mostly Explosive"
  | "Controlled Explosive"
  | "Controlled"
  | "Controlled Lengthy"
  | "Mostly Lengthy"
  | "Lengthy";

export type MainAttributeName =
  | "pace"
  | "shooting"
  | "passing"
  | "dribbling"
  | "defending"
  | "physicality";

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
  | "defensiveAwareness"
  | "standingTackle"
  | "slidingTackle"
  | "jumping"
  | "stamina"
  | "strength"
  | "aggression";

export type PlayerAttribute = {
  value: number;
  maxValue: 99;
};

export type Player = {
  position: Position;
  height: number;
  weight: number;
  attributes: Map<AttributeName, PlayerAttribute>;
  weakFoot: number;
  skillMoves: number;
};

export type UpdateAttributeAction = {
  attribute: AttributeName;
  value: number;
};

export const updatePlayer = (
  player: Player,
  actionType: "INC" | "DEC",
  actions: UpdateAttributeAction[],
) => {
  const update = (action: UpdateAttributeAction) => {
    const attribute = player.attributes.get(action.attribute)!;
    const updatedValue = actionType === "INC" ? action.value : -action.value;
    return {
      ...player,
      attributes: new Map(
        player.attributes.set(action.attribute, {
          ...attribute,
          value: attribute.value + updatedValue,
        }),
      ),
    };
  };

  return actions.reduce((_, action) => update(action), player);
};

export const getAccelerationRate = (player: Player): AccelerationRate => {
  const height = player.height;
  const agility = player.attributes.get("agility")!.value;
  const strength = player.attributes.get("strength")!.value;
  const acceleration = player.attributes.get("acceleration")!.value;
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
    height >= 181 &&
    strength >= 65 &&
    acceleration >= 40 &&
    agilityVsStrengthDifference >= 4
  )
    return "Controlled Lengthy";

  if (
    height >= 183 &&
    strength >= 75 &&
    acceleration >= 55 &&
    agilityVsStrengthDifference >= 12
  )
    return "Mostly Lengthy";

  if (
    height >= 188 &&
    strength >= 80 &&
    acceleration >= 55 &&
    agilityVsStrengthDifference >= 20
  )
    return "Lengthy";

  return "Controlled";
};

export const getCategoryAttributes = (
  attributes: Map<AttributeName, PlayerAttribute>,
) => {
  return new Map<MainAttributeName, Map<AttributeName, PlayerAttribute>>([
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
        ["positioning", attributes.get("positioning")!],
        ["finishing", attributes.get("finishing")!],
        ["shotPower", attributes.get("shotPower")!],
        ["longShots", attributes.get("longShots")!],
        ["volleys", attributes.get("volleys")!],
        ["penalties", attributes.get("penalties")!],
      ]),
    ],
    [
      "passing",
      new Map([
        ["vision", attributes.get("vision")!],
        ["crossing", attributes.get("crossing")!],
        ["freeKickAccuracy", attributes.get("freeKickAccuracy")!],
        ["shortPassing", attributes.get("shortPassing")!],
        ["longPassing", attributes.get("longPassing")!],
        ["curve", attributes.get("curve")!],
      ]),
    ],
    [
      "dribbling",
      new Map([
        ["agility", attributes.get("agility")!],
        ["balance", attributes.get("balance")!],
        ["reactions", attributes.get("reactions")!],
        ["ballControl", attributes.get("ballControl")!],
        ["dribbling", attributes.get("dribbling")!],
        ["composure", attributes.get("composure")!],
      ]),
    ],
    [
      "defending",
      new Map([
        ["interceptions", attributes.get("interceptions")!],
        ["headingAccuracy", attributes.get("headingAccuracy")!],
        ["defensiveAwareness", attributes.get("defensiveAwareness")!],
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
        ["aggression", attributes.get("aggression")!],
      ]),
    ],
  ]);
};

export const getMainAttributes = (
  attributes: Map<AttributeName, PlayerAttribute>,
) => {
  const getAverageValue = (values: number[]) =>
    Math.round(values.reduce((acc, value) => acc + value, 0) / values.length);

  const categoryAttributes = getCategoryAttributes(attributes);
  
  return new Map<MainAttributeName, PlayerAttribute>(
    Array.from(categoryAttributes.entries()).map(
      ([mainAttributeName, catAttr]) => [
        mainAttributeName,
        {
          value: getAverageValue(
            Array.from(catAttr.values()).map((a) => a.value),
          ),
          maxValue: 99,
        },
      ],
    ),
  );
};
