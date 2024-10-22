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

export type AttributeCategory =
  | "pace"
  | "shooting"
  | "passing"
  | "dribbling"
  | "defending"
  | "physicality";

export type PlayerAttribute = {
  value: number;
  maxValue: 99;
};

export type Player = {
  position: Position;
  height: number;
  weight: number;
  attributes: Map<AttributeCategory, Map<string, PlayerAttribute>>;
  weakFoot: number;
  skillMoves: number;
  accelerationRate: AccelerationRate;
};

export type UpdateAttributeAction = {
  category: AttributeCategory;
  attribute: string;
  value: number;
};
