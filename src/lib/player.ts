export type PlayerAttribute = {
  value: number;
  maxValue: 99;
};

export type PlayerAttributes = {
  Pace: {
    Acceleration: PlayerAttribute;
    "Sprint speed": PlayerAttribute;
  };
  Shooting: {
    Positioning: PlayerAttribute;
    Finishing: PlayerAttribute;
    "Shot Power": PlayerAttribute;
    "Long Shots": PlayerAttribute;
    Volleys: PlayerAttribute;
    Penalties: PlayerAttribute;
  };
  Passing: {
    Vision: PlayerAttribute;
    Crossing: PlayerAttribute;
    "Free Kick Accuracy": PlayerAttribute;
    "Short Passing": PlayerAttribute;
    "Long Passing": PlayerAttribute;
    Curve: PlayerAttribute;
  };
  Dribbling: {
    Agility: PlayerAttribute;
    Balance: PlayerAttribute;
    Reactions: PlayerAttribute;
    "Ball Control": PlayerAttribute;
    Dribbling: PlayerAttribute;
    Composure: PlayerAttribute;
  };
  Defending: {
    Interceptions: PlayerAttribute;
    "Heading accuracy": PlayerAttribute;
    "Def awareness": PlayerAttribute;
    "Standing Tackle": PlayerAttribute;
    "Sliding Tackle": PlayerAttribute;
  };
  Physicality: {
    Jumping: PlayerAttribute;
    Stamina: PlayerAttribute;
    Strength: PlayerAttribute;
    Aggression: PlayerAttribute;
  };
};

type Role =
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

export type Player = {
  position: Role;
  height: number;
  weight: number;
  attributes: PlayerAttributes;
  weakFoot: number;
  skillMoves: number;
  accelerationRate: AccelerationRate;
};
